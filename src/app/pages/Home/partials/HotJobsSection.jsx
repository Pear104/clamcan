import { Card, Space } from "antd";
import { Link } from "react-router-dom";
import data from "mocks/posts.json";

const Item = ({ data }) => {
  const daysUntil = (targetDateStr) =>
    Math.ceil((new Date(targetDateStr) - new Date()) / (1000 * 60 * 60 * 24));

  return (
    <div onClick={() => (window.location.href = `/jobs/${data.id}`)}>
      <Card
        title={data.company_industry}
        extra={
          <Link
            to={`/jobs/${data.id}`}
            className="text-blue-500 hover:underline"
          >
            Details
          </Link>
        }
        style={{
          width: 400,
        }}
        hoverable
      >
        <div className="flex items-center">
          <div className="basis-1/4">
            <div
              className="col-span-3 bg-no-repeat bg-contain bg-center aspect-square rounded-3xl border"
              style={{
                backgroundImage: `url(${data.logo})`,
              }}
            ></div>
          </div>
          <div className="basis-3/4 ml-5">
            <p className="font-bold text-lg">{data.title}</p>
            <p className="text-slate-500">{data.country}</p>
          </div>
        </div>

        <p className="my-2">{data.sumary}</p>
        <p className="text-slate-500">
          Only {daysUntil(data.to_date)} days left to apply!
        </p>
      </Card>
    </div>
  );
};

const HotJobsSection = () => {
  return (
    <div className="bg-gray-200 py-12">
      <div className="w-full flex justify-center mb-8">
        <h1 className="inter-semibold text-[45px] text-gray-600 leading-tight">
          Currently <span className="text-blue-500">Hot</span> Jobs
        </h1>
      </div>
      <div className="w-full flex justify-center">
        <div className="flex justify-center gap-8 flex-wrap">
          {data
            .reverse()
            .slice(0, 8)
            .map((item) => (
              <Item data={item} key={item.id} />
            ))}
        </div>
      </div>

      <div className="text-blue-500 m-4 mr-20 text-xl font-bold flex justify-end">
        <div className="cursor-pointer w-fit hover:underline">
          <Link to="/jobs">See all jobs {">>"}</Link>
        </div>
      </div>
    </div>
  );
};

export default HotJobsSection;
