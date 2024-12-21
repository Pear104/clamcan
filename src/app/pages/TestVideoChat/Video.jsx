import React, { useEffect, useRef, useState } from "react";
import { firebaseConfig } from "app/modules/firebase";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  doc,
  addDoc,
  setDoc,
  getDoc,
  updateDoc,
  onSnapshot,
} from "firebase/firestore";
import { Button, Input, Typography } from "antd";
import { useSearchParams } from "react-router-dom";
const { Title } = Typography;

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const Video = () => {
  const [inviteId, setInviteId] = useSearchParams();
  const [roomId, setRoomId] = useState("");
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const [createRoomDisable, setCreateRoomDisable] = useState(false);
  const pc = useRef(
    new RTCPeerConnection({
      iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
    })
  ).current;

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        localVideoRef.current.srcObject = stream;
        stream.getTracks().forEach((track) => pc.addTrack(track, stream));
      })
      .catch(console.error);

    pc.ontrack = (event) => {
      if (event.streams[0]) remoteVideoRef.current.srcObject = event.streams[0];
    };

    pc.onicecandidate = async (event) => {
      if (event.candidate && roomId) {
        await addDoc(
          collection(db, "rooms", roomId, "candidates"),
          event.candidate.toJSON()
        );
      }
    };

    if (inviteId.get("id")) {
      joinRoom();
    }
  }, [roomId]);

  async function createRoom() {
    const roomRef = await addDoc(collection(db, "rooms"), {});
    setRoomId(roomRef.id);

    const offer = await pc.createOffer();
    await pc.setLocalDescription(offer);

    await setDoc(roomRef, { offer: { type: offer.type, sdp: offer.sdp } });

    onSnapshot(doc(db, "rooms", roomRef.id), async (snapshot) => {
      const data = snapshot.data();
      if (!pc.currentRemoteDescription && data && data.answer) {
        const answerDescription = new RTCSessionDescription(data.answer);
        await pc.setRemoteDescription(answerDescription);
      }
    });

    onSnapshot(
      collection(db, "rooms", roomRef.id, "candidates"),
      (snapshot) => {
        snapshot.docChanges().forEach(async (change) => {
          if (change.type === "added") {
            const candidate = new RTCIceCandidate(change.doc.data());
            pc.addIceCandidate(candidate).catch(console.error);
          }
        });
      }
    );
  }

  async function joinRoom() {
    if (inviteId.get("id")) {
      setRoomId(inviteId.get("id"));
    }

    setCreateRoomDisable(true);

    if (!roomId) return;
    const roomRef = doc(db, "rooms", roomId);
    const roomSnapshot = await getDoc(roomRef);

    if (roomSnapshot.exists()) {
      const roomData = roomSnapshot.data();
      const offerDescription = new RTCSessionDescription(roomData.offer);
      await pc.setRemoteDescription(offerDescription);

      const answer = await pc.createAnswer();
      await pc.setLocalDescription(answer);

      await setDoc(
        doc(db, "rooms", roomId),
        { answer: { type: answer.type, sdp: answer.sdp } },
        { merge: true }
      );

      onSnapshot(collection(db, "rooms", roomId, "candidates"), (snapshot) => {
        snapshot.docChanges().forEach((change) => {
          if (change.type === "added") {
            const candidate = new RTCIceCandidate(change.doc.data());
            pc.addIceCandidate(candidate).catch(console.error);
          }
        });
      });
    } else {
      console.log("Room does not exist.");
    }
  }

  return (
    <div>
      <Title level={4} className="flex justify-center p-5">"Keep calm and carry on"</Title>
      <div className="flex justify-center pb-5">
        <video playsInline muted ref={localVideoRef} autoPlay className="pr-3" />
        <video playsInline ref={remoteVideoRef} autoPlay />
      </div>
      <div className="flex justify-center p-5">
        <Button onClick={createRoom} disabled={createRoomDisable}>
          Create Room
        </Button>
        {inviteId.get("id") ? (
          <div className="grid grid-cols-1">
          <p className="px-3">In room {roomId}</p> <br/>
          <p className="">If nothing is shown, please contact your interviewer</p>
          </div>
        ) : (
          <Input
            onChange={(e) => setRoomId(e.target.value)}
            onClick={(e) => navigator.clipboard.writeText(e.target.value)}
            value={
              inviteId.get("id")
                ? inviteId.get("id")
                : `${window.location.href}?id=${roomId}`
            }
            className="w-1/3 block"
          />
        )}

        {/* <Button onClick={joinRoom}>Join Room</Button> */}
      </div>
    </div>
  );
};

export default Video;
