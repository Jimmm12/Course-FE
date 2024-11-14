import Courses from "./Courses";

const Homepage = () => {
  return (
    <>

      {/* Background Image Section */}
      <div className="relative">
        <img src="/Bg.png" className="w-full h-auto" alt="Background" />
        <div className="absolute inset-0 flex flex-col items-start justify-center p-4 ml-3">
          <h3 className="text-black text-3xl font-bold">
            Nhiều lựa chọn các khóa học
          </h3>
          <p className="mt-2 text-lg text-gray-700 max-w-md">
            Chọn từ 213.000 khóa học video trực tuyến với những bổ sung mới được xuất bản hàng tháng.
          </p>
        </div>
      </div>

      <div className="mt-6">
        <Courses />
      </div>
      

    </>
  );
}

export default Homepage;
