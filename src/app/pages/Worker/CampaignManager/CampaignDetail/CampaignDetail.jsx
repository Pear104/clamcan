// import campaign from "mocks/campaigns";
import { Button, Skeleton, Table, Tag } from "antd";
import React, { useEffect, useState } from "react";
import {
  CalendarRange,
  Check,
  CircleDollarSign,
  Clock,
  Eye,
  PencilLine,
  Users,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";
// import postData from "mocks/posts";
import { getRandomInt } from "app/modules/random";
import { postColumns } from "../../PostManager/schemas";
import MDEditor from "@uiw/react-md-editor";
import CreateModal from "app/components/CreateModal";
import { GET } from "app/modules/request";
import dayjs from "dayjs";
import CreateCampaignForm from "../../forms/CreateCampaignForm";
import { sQuery } from "app/stores/queryStore";
import { sConfig } from "app/stores/configStore";
import language from "app/locales/pages/Worker/CampaignManager/CampaignForm.json";
import StatItem from "app/components/StatItem";

export default function CampaignDetail() {
  const { id } = useParams();
  const [campaign, setCampaign] = useState({});
  const [postData, setPostData] = useState([]);
  const config = sConfig.use();

  useEffect(() => {
    (async () => {
      const { data } = await GET(`/campaign/${id}`);
      setCampaign(data.data);
      const { data: postData, status: postStatus } = await GET(`/post`);
      setPostData(postData.data);
    })();
  }, [sQuery.use().revalidate]);

  return (
    <>
      <div className="grid grid-cols-12 gap-4">
        <div className="w-full bg-white dark:bg-[#0D1117] rounded-md mb-2 p-4 border border-zinc-500 col-span-7">
          <div className="flex gap-4">
            <div className="w-full">
              <div className="text-2xl font-semibold flex justify-between gap-8 dark:text-white grow"></div>
            </div>
          </div>

          <div className="text-2xl font-semibold">
            {language[config.language].description}
          </div>
          {!campaign?.description ? (
            <Skeleton className="mt-3" block active paragraph={{ rows: 20 }} />
          ) : (
            <MDEditor.Markdown
              source={campaign?.description}
              className="py-2"
            />
          )}
        </div>
        <div className="col-span-5">
          <div className="sticky top-4 w-full bg-white dark:bg-[#0D1117] rounded-md mb-2 p-4 border border-zinc-500">
            <div className="flex items-start gap-2">
              {!campaign?.logo ? (
                <Skeleton.Image active />
              ) : (
                <div
                  style={{ backgroundImage: `url(${campaign?.logo})` }}
                  className="aspect-square h-[90px] bg-center bg-cover rounded-xl bg-white border"
                ></div>
              )}
              <div className="w-full">
                <div
                  className="text-lg flex items-center w-[100px] font-medium table-cell-title"
                  title={campaign?.name}
                >
                  {!campaign?.name ? (
                    <Skeleton.Input className="w-full" block active />
                  ) : (
                    <>
                      {campaign?.name}{" "}
                      <span className="text-sm mr-1 font-semibold">
                        (#{campaign?.id})
                      </span>
                    </>
                  )}
                </div>
                <div>
                  {!campaign?.name ? (
                    <Skeleton.Input className="mt-1" active />
                  ) : (
                    <>
                      <Tag
                        className="mt-1 text-xs"
                        color={
                          campaign?.admin_approve == "1"
                            ? "green-inverse"
                            : "volcano-inverse"
                        }
                        icon={
                          campaign?.admin_approve == "1" && (
                            <Check
                              size={13}
                              className="anticon anticon-check"
                            />
                          )
                        }
                      >
                        {
                          language[config.language][
                            campaign?.admin_approve == "1"
                              ? "approved"
                              : "pending"
                          ]
                        }
                      </Tag>
                      {
                        <Tag
                          className="mt-1 text-xs"
                          color={
                            dayjs().isBefore(dayjs(campaign?.startDate))
                              ? "red-inverse"
                              : dayjs().isAfter(dayjs(campaign?.startDate))
                              ? "blue-inverse"
                              : "green-inverse"
                          }
                        >
                          {dayjs().isBefore(dayjs(campaign?.startDate))
                            ? "Not Started"
                            : dayjs().isAfter(dayjs(campaign?.startDate))
                            ? "Ongoing"
                            : "Completed"}
                        </Tag>
                      }
                    </>
                  )}
                </div>
              </div>
            </div>
            {!campaign?.name ? (
              <Skeleton.Input className="mt-2" block active />
            ) : (
              <div className="flex gap-3 nunito-sans my-2 justify-between">
                <StatItem
                  icon={
                    <div className="p-2 bg-blue-200 rounded-md">
                      <Users
                        size={24}
                        className="text-blue-500"
                        absoluteStrokeWidth
                      />
                    </div>
                  }
                  label={language[config.language].hiring_count}
                  value={campaign?.hiring_count}
                />
                <StatItem
                  icon={
                    <div className="p-2 bg-green-200 rounded-md">
                      <CircleDollarSign
                        size={24}
                        className="text-green-500"
                        absoluteStrokeWidth
                      />
                    </div>
                  }
                  label={language[config.language].estimated_cost}
                  value={"$" + campaign?.estimated_cost?.toLocaleString()}
                />
                <StatItem
                  icon={
                    <div className="p-2 bg-purple-200 rounded-md">
                      <CalendarRange
                        size={24}
                        className="text-purple-500"
                        absoluteStrokeWidth
                      />
                    </div>
                  }
                  label={"Duration"}
                  value={
                    dayjs(campaign?.endDate).diff(
                      dayjs(campaign?.startDate),
                      "days"
                    ) + " days"
                  }
                />
              </div>
            )}

            <div className="my-4">
              {campaign?.summary ? (
                <>
                  <div className="text-2xl font-semibold">Summary</div>
                  <MDEditor.Markdown
                    source={campaign?.summary}
                    className="py-2"
                  />
                </>
              ) : (
                <Skeleton className="mt-2" block active />
              )}
            </div>
            {campaign?.summary ? (
              <div className="flex gap-2 justify-between">
                <div className="flex gap-2">
                  <CreateModal
                    icon={<PencilLine size={20} />}
                    children={"Update"}
                    modalTitle={`${language[config.language].update} #${
                      campaign?.id
                    }`}
                    form={(setIsModalOpen) => (
                      <CreateCampaignForm
                        setIsModalOpen={setIsModalOpen}
                        record={campaign}
                      />
                    )}
                  />
                </div>
                <div className="text-sm flex gap-2 items-center font-semibold justify-end">
                  <Clock size={20} />
                  {dayjs(campaign?.startDate).format("DD/MM/YYYY")} -{" "}
                  {dayjs(campaign?.endDate).format("DD/MM/YYYY")}
                </div>
              </div>
            ) : (
              <Skeleton.Input className="mt-2" block active />
            )}
          </div>
        </div>
      </div>

      <div className="border rounded-md border-black/20 my-4">
        <Table
          title={() => (
            <div className="text-xl font-semibold">Posts of Campaign #{id}</div>
          )}
          columns={postColumns().filter((c) => includeCol.includes(c.key))}
          dataSource={postData.filter(
            (item) => item.campaign_id == campaign?.id
          )}
        />
      </div>
    </>
  );
}

const includeCol = [
  "id",
  "title",
  "country",
  "company_industry",
  "working_days",
  "time",
];
