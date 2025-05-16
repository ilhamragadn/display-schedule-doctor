import { useEffect, useState } from "react";
import { UseTokenAPIContext } from "../contexts/TokenAPIContext";
import { authAPI } from "../utils/api";
import { UseListSchedule } from "../utils/scheduleDoctors";
import { formattedTimes, formattedToday } from "../utils/date";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import rsmklIcon from "../assets/logo-rsmkl-icon.png";

const SecondaryModel = () => {
  // Handle Token API
  const { setTokenAPI } = UseTokenAPIContext();

  useEffect(() => {
    authAPI(setTokenAPI);
  }, [setTokenAPI]);

  // Handle Waktu
  const [times, setTimes] = useState("");

  // Mulai Jadwal Praktek Dokter
  const allSchedules = UseListSchedule();

  // State untuk current slide
  const [currentSlide, setCurrentSlide] = useState(0);

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % allSchedules.length);
  };

  const goToPrev = () => {
    setCurrentSlide((prev) =>
      prev === 0 ? allSchedules.length - 1 : prev - 1
    );
  };

  //   1000 = 1 detik
  useEffect(() => {
    authAPI(setTokenAPI);

    const timesInterval = setInterval(() => {
      const now = new Date();
      const IDTimes = now.toLocaleTimeString("id-ID");
      setTimes(IDTimes);
    }, 1000);

    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % allSchedules.length);
    }, 15000);

    return () => {
      clearInterval(timesInterval);
      clearInterval(slideInterval);
    };
  }, [allSchedules.length, setTokenAPI]);

  return (
    <div className="relative h-screen">
      {/* Header */}
      <div className="fixed w-full top-0 z-40">
        <div className="text-white text-center font-medium italic bg-gradient-to-tr from-violet-400 to bg-rose-300 via-fuchsia-500 pt-2 pb-4 rounded-b-2xl shadow">
          <h3 className="text-4xl">Jadwal Praktek Dokter</h3>
          <h3 className="text-3xl">Rumah Sakit Muhammadiyah Kalikapas</h3>
        </div>
        <div className="w-fit mx-auto mt-2 px-8 py-2 bg-black shadow-lg rounded-lg">
          <h3 className="text-center text-3xl text-white text-shadow-white font-medium">
            {`${formattedToday} ${times} WIB`}
          </h3>
        </div>
      </div>

      {/* Carousel */}
      <div className="relative min-h-screen w-full">
        <img
          src={rsmklIcon}
          alt="logo-rsmkl"
          className="absolute inset-0 w-full h-screen object-cover opacity-25 blur-sm pointer-events-none z-0"
        />

        <div className="relative h-56 overflow-hidden rounded-xl md:min-h-screen z-10">
          {allSchedules.map((schedule, index) => (
            <div
              key={index}
              className={`flex justify-center absolute top-44 inset-0 transition-opacity duration-700 ease-in-out ${
                currentSlide === index ? "opacity-100" : "opacity-0"
              }`}
            >
              <div className="flex justify-evenly w-3/4 px-4 pb-8">
                <img
                  src={`data:image/jpeg;base64,${schedule.photo}`}
                  alt={`foto-${schedule.dokterName}`}
                  loading="lazy"
                  className="drop-shadow-xl shadow-xl rounded-xl"
                />

                <div className="flex flex-col justify-center items-center px-4">
                  <p className="text-gray-600/75 text-lg font-semibold italic bg-cyan-100 px-4 py-1 rounded shadow">
                    {`Kode DPJP: ${schedule.dpjp || "-"}`}
                  </p>
                  <p className="mt-2 text-3xl text-center font-medium">
                    {schedule.dokterName}
                  </p>
                  {/* <p className="text-gray-500/75 text-sm text-center font-semibold italic">{`Dokter ${schedule.spe}`}</p> */}
                  <p className="text-2xl font-semibold my-1">
                    {`${formattedTimes(
                      schedule.beginTime
                    )} WIB - ${formattedTimes(schedule.endTime)} WIB`}
                  </p>
                  <div className="mt-2">
                    {times <= formattedTimes(schedule.endTime) ? (
                      <div className="w-full bg-green-500 py-2 px-6 text-white text-xl font-bold tracking-wide rounded-md shadow-md">
                        Jam Praktek Tersedia
                      </div>
                    ) : (
                      <div className="w-full bg-red-200 border border-red-600 py-2 px-6 text-red-600 text-xl font-bold tracking-wide rounded-md shadow-md">
                        Jam Praktek Selesai
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* slider controls left */}
        <button
          type="button"
          onClick={goToPrev}
          className="absolute top-3/5 start-0 z-30 -translate-y-1/2 flex items-center px-1 cursor-pointer focus:outline-none"
        >
          <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-100/80">
            <FontAwesomeIcon
              icon={faChevronLeft}
              size="xl"
              className="font-semibold"
            />
          </span>
        </button>
        {/* slider controls right */}
        <button
          type="button"
          onClick={goToNext}
          className="absolute top-3/5 end-0 z-30 -translate-y-1/2 flex items-center px-1 cursor-pointer focus:outline-none"
        >
          <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-100/80">
            <FontAwesomeIcon
              icon={faChevronRight}
              size="xl"
              className="font-semibold"
            />
          </span>
        </button>

        {/* slider indicators */}
        <div className="absolute z-30 flex -translate-x-1/2 space-x-2 rtl:space-x-reverse bottom-2 left-1/2">
          {allSchedules.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-4 h-4 rounded-full ${
                index === currentSlide ? "bg-cyan-500" : "bg-gray-200/80"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SecondaryModel;
