import { useEffect, useState } from "react";
import { formattedTimes, formattedToday } from "../utils/date";
import { authAPI } from "../utils/api";
import { UseTokenAPIContext } from "../contexts/TokenAPIContext";
import { UseListSchedule } from "../utils/scheduleDoctors";
import { chunkArray } from "../utils/chunk";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import rsmklIcon from "../assets/logo-rsmkl-icon.png";

const DoctorScheduleDisplay = () => {
  // Handle Token API
  const { setTokenAPI } = UseTokenAPIContext();

  // Handle Waktu
  const [times, setTimes] = useState("");

  // Mulai Jadwal Praktek Dokter
  const allSchedules = UseListSchedule();
  const chunks = chunkArray(allSchedules, 2);

  // State untuk current slide
  const [currentSlide, setCurrentSlide] = useState(0);

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % chunks.length);
  };

  const goToPrev = () => {
    setCurrentSlide((prev) => (prev === 0 ? chunks.length - 1 : prev - 1));
  };

  // 1000 = 1 detik
  useEffect(() => {
    authAPI(setTokenAPI);

    const timesInterval = setInterval(() => {
      const now = new Date();
      const IDTimes = now.toLocaleTimeString("id-ID");
      setTimes(IDTimes);
    }, 1000);

    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % chunks.length);
    }, 15000);

    return () => {
      clearInterval(timesInterval);
      clearInterval(slideInterval);
    };
  }, [chunks.length, setTokenAPI]);

  return (
    <div className="relative h-screen">
      {/* Header */}
      <div className="fixed w-full top-0 z-40">
        <div className="text-white text-center font-medium italic bg-gradient-to-tr from-violet-400 to bg-rose-300 via-fuchsia-500 pt-2 pb-4 rounded-b-2xl shadow">
          <h3 className="text-4xl">Jadwal Praktek Dokter</h3>
          <h3 className="text-3xl">Rumah Sakit Muhammadiyah Kalikapas</h3>
        </div>
        <div className="w-fit mx-auto mt-6 px-8 py-2 bg-black shadow-lg rounded-lg">
          <h3 className="text-center text-3xl text-white text-shadow-white font-medium">
            {`${formattedToday} ${times} WIB`}
          </h3>
        </div>
      </div>

      {/* Carousel */}
      <div className="relative min-h-screen w-full pt-48">
        <img
          src={rsmklIcon}
          alt="logo-rsmkl"
          className="absolute inset-0 w-full h-screen object-cover opacity-25 blur-md pointer-events-none z-0"
        />
        <div className="relative h-56 overflow-hidden rounded-lg md:h-[512px] z-10">
          {chunks.map((chunk, i) => (
            <div
              key={i}
              className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                currentSlide === i ? "opacity-100" : "opacity-0"
              }`}
            >
              <div className="grid grid-cols-2 gap-2 mx-8 mt-1">
                {chunk.map((jadwal, j) => (
                  <div
                    key={j}
                    className="flex flex-col justify-center items-center bg-white p-4 rounded-lg shadow-md"
                  >
                    <div className="flex justify-center items-center space-x-4 w-full">
                      <img
                        src={`data:image/jpeg;base64,${jadwal.photo}`}
                        alt={`foto-${jadwal.dokterName}`}
                        loading="lazy"
                        className="max-w-[400px] max-h-[457px] drop-shadow-xl shadow-lg rounded-lg"
                      />
                      <div className="flex flex-col justify-center items-center p-1">
                        <p className="text-gray-500/75 font-semibold italic">
                          {`Kode DPJP: ${jadwal.dpjp || "-"}`}
                        </p>
                        <p className="text-2xl text-center font-medium">
                          {jadwal.dokterName}
                        </p>
                        {/* <p className="text-gray-500/75 text-sm text-center font-semibold italic">{`Dokter ${jadwal.spe}`}</p> */}
                        <p className="text-xl font-semibold">
                          {`${formattedTimes(
                            jadwal.beginTime
                          )} WIB - ${formattedTimes(jadwal.endTime)} WIB`}
                        </p>
                        <div className="mt-2">
                          {times <= formattedTimes(jadwal.endTime) ? (
                            <div className="w-full bg-green-500 py-1 px-4 text-white text-lg font-bold tracking-wide rounded-md shadow-md">
                              Jam Praktek Tersedia
                            </div>
                          ) : (
                            <div className="w-full bg-red-200 border border-red-600 py-1 px-4 text-red-600 text-lg font-bold tracking-wide rounded-md shadow-md">
                              Jam Praktek Selesai
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
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
          {chunks.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`w-4 h-4 rounded-full ${
                idx === currentSlide ? "bg-sky-600" : "bg-gray-200/80"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DoctorScheduleDisplay;
