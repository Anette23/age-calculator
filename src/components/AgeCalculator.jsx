import { useState } from "react";
import { useForm } from "react-hook-form";
import arrow from "../assets/images/icon-arrow.svg";
import dayjs from "dayjs";

const AgeCalculator = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [age, setAge] = useState({
    years: 0,
    months: 0,
    days: 0,
  });

  const calculateAge = (data) => {
    const today = dayjs();
    const birthdateDate = dayjs(
      `${data.year}-${data.month}-${data.day}`,
      "YYYY-MM-DD"
    );

    //  const diff = today.diff(birthdateDate, "day")
    const years = today.diff(birthdateDate, "year");
    const months = today.diff(birthdateDate.add(years, "year"), "month");
    const days = today.diff(
      birthdateDate.add(years, "year").add(months, "month"),
      "day"
    );

    setAge({ years, months, days });
  };

  const formSubmit = (data) => {
    calculateAge(data);
    reset();
  };

  return (
    <div className="card bg-white w-full max-w-[50rem] border-b-8 border-smokedGrey">
      <form onSubmit={handleSubmit(formSubmit)}>
        <div className="flex gap-4 lg:gap-6 border-b-[1px] pb-20 mb-20">
          <div className="flex flex-col">
            <label htmlFor="day">DAY</label>
            <input
              type="text"
              name="day"
              id="day"
              placeholder="DD"
              className={errors.day ? "border-lightRed " : "border-lightGrey"}
              {...register("day", {
                required: true,
                minLength: 2,
                maxLength: 2,
                validate: {
                  validDate: (value) => {
                    const parsedValue = parseInt(value);
                    if (
                      isNaN(parsedValue) ||
                      parsedValue < 1 ||
                      parsedValue > 31
                    ) {
                      return "Day must be a valid date";
                    }
                    return true;
                  },
                },
              })}
            />
            {errors.day && (
              <p className="text-lightRed text-xs mt-2 italic">
                {errors.day.type === "required"
                  ? "This field is required"
                  : errors.day.message}
              </p>
            )}
          </div>
          <div className="flex flex-col">
            <label htmlFor="month">MONTH</label>
            <input
              type="text"
              name="month"
              id="month"
              placeholder="MM"
              {...register("month", {
                required: true,
                minLength: 2,
                maxLength: 2,
                validate: {
                  validMonth: (value) => {
                    const parsedValue = parseInt(value);
                    if (
                      isNaN(parsedValue) ||
                      parsedValue < 1 ||
                      parsedValue > 12
                    ) {
                      return "Month must be a valid month (1-12)";
                    }
                    return true;
                  },
                },
              })}
            />
            {errors.month && (
              <p className="text-lightRed text-xs mt-2 italic">
                {errors.month.type === "required"
                  ? "This field is required"
                  : errors.month.message}
              </p>
            )}
          </div>
          <div className="flex flex-col">
            <label htmlFor="year">YEAR</label>
            <input
              type="text"
              name="year"
              id="year"
              placeholder="YYYY"
              {...register("year", {
                required: true,
                minLength: 4,
                maxLength: 4,
                validate: {
                  validYear: (value) => {
                    const parsedValue = parseInt(value);
                    const currentYear = new Date().getFullYear();
                    if (
                      isNaN(parsedValue) ||
                      parsedValue < 1900 ||
                      parsedValue > currentYear
                    ) {
                      return `Year must be a valid year (1900-${currentYear})`;
                    }
                    return true;
                  },
                },
              })}
            />
            {errors.year && (
              <p className="text-lightRed text-xs mt-2 italic">
                {errors.year.type === "required"
                  ? "This field is required"
                  : errors.year.message}
              </p>
            )}
          </div>
        </div>
        <div className="flex justify-center md:justify-end -mt-28">
          <button
            type="submit"
            className="bg-purple duration-500 hover:bg-offBlack rounded-full p-4"
          >
            <img src={arrow} alt="arrow" />
          </button>
        </div>
      </form>
      <div className="my-10">
        <p className="stat text-offBlack text-9xl font-extrabold italic mb-4 tracking-tighter">
          <span className="text-purple mr-3">{`${
            age.years ? age.years : "- -"
          }`}</span>
          years
        </p>
        <p className="stat text-offBlack text-9xl font-extrabold italic mb-4 tracking-tighter">
          <span className="text-purple mr-3">{`${
            age.months ? age.months : "- -"
          }`}</span>{" "}
          months
        </p>
        <p className="stat text-offBlack text-9xl font-extrabold italic mb-4 tracking-tighter">
          <span className="text-purple mr-2">{`${
            age.days ? age.days : "- -"
          }`}</span>{" "}
          days
        </p>
      </div>
    </div>
  );
};

export default AgeCalculator;
