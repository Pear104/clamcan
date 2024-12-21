import MDEditor from "@uiw/react-md-editor";
import { DatePicker } from "antd";
import { useState } from "react";

const CreateUserForm = ({ setIsModalOpen }) => {
  // const [logo, setLogo] = useState("");
  const [value, setValue] = useState("**Hello world!!!**");
  return (
    <form className="overflow-y-scroll small-scrollbar h-full pr-3">
      <div className="grid grid-cols-2 gap-4 mb-2">
        <div>
          <div className="font-semibold text-base pb-2">Name</div>
          <input
            placeholder="Your name"
            className="input-style py-[9px] px-2 text-sm"
          />
        </div>
        <div>
          <div className="font-semibold text-base pb-2">Email</div>
          <input
            placeholder="Your email address"
            className="input-style py-[9px] px-2 text-sm"
          />
        </div>
        <div>
          <div className="font-semibold text-base pb-2">Address</div>
          <input
            placeholder="Your home address"
            className="input-style py-[9px] px-2 text-xs"
          />
        </div>
        <div>
          <div className="font-semibold text-base pb-2">Phone</div>
          <input
            placeholder="Your phonenumber"
            className="input-style py-[9px] px-2 text-sm"
          />
        </div>
      </div>
      <div className="grid grid-cols-4 gap-4 mb-2">
        <div>
          <div className="font-semibold text-base pb-2">DOB</div>
          <DatePicker className="w-full py-2" />
        </div>
        <div>
          <div className="font-semibold text-base pb-2">School</div>
          <input type="text" className="input-style py-[9px] px-2 text-sm" />
        </div>
        <div>
          <div className="font-semibold text-base pb-2">Major</div>
          <input type="text" className="input-style py-[9px] px-2 text-sm" />
        </div>
        <div>
          <div className="font-semibold text-base pb-2">Degre</div>
          <input type="text" className="input-style py-[9px] px-2 text-sm" />
        </div>
      </div>
      <div className="font-semibold text-base pb-2">Description</div>
      <MDEditor
        className="border min-h-[500px]"
        preview="live"
        value={value}
        onChange={setValue}
      />
    </form>
  );
};

export default CreateUserForm;
