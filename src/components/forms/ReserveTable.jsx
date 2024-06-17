import { useState } from "react";
import { submitAPI } from "../../api";
import * as Yup from "yup";
import "../../styles/ReserveTable.scss";
import { useNavigate } from "react-router-dom";
import { Formik, useFormik } from "formik";
import {
  VStack,
  Heading,
  Box,
  FormControl,
  Input,
  FormLabel,
  FormErrorMessage,
  Button,
  Spinner,
  Select,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";

export default function ReserveTable({ availableTimes, onDateChange }) {
  const navigate = useNavigate();
  // const [date, setDate] = useState("");
  // const [resTime, setResTime] = useState("");
  // const [guests, setGuests] = useState(1);
  // const [occasion, setOccasion] = useState("Birthday");
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState({});
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // const handleDateChange = (e) => {
  //   const newDate = e.target.value;
  //   setDate(newDate);
  //   onDateChange(new Date(newDate)); // Call handler to update times
  // };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   const formData = { date, resTime, guests, occasion };
  //   try {
  //     setLoading(true);
  //     const success = submitAPI(formData);
  //     setTimeout(() => {
  //       if (success && date !== "" && resTime !== "") {
  //         setDate("");
  //         setGuests(1);
  //         setResTime("");
  //         setOccasion("Birthday");
  //         setLoading(false);
  //         navigate("/ConfirmedBooking");
  //       } else {
  //         setLoading(false);
  //         alert("Failed to submit reservation.");
  //       }
  //     }, 1000);
  //   } catch (error) {
  //     console.error("Error submitting reservation:", error);
  //     alert("An error occurred while submitting the reservation.");
  //   }
  // };

  const formik = useFormik({
    initialValues: {
      date: "",
      resTime: "",
      guests: 1,
      occasion: "",
    },
    validationSchema: Yup.object({
      date: Yup.date()
        .required("Date is required")
        .min(today, "Cannot be before today!"),
      resTime: Yup.string().required("Time is required"),
      guests: Yup.number()
        .required("Number of guests is required")
        .min(1, "Must be equal or greater than 1")
        .max(10, "Must be equal or lower than 10"),
      occasion: Yup.string().required("Occasion is required"),
    }),
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      setLoading(true);
      try {
        // Call submitAPI with form values
        const success = await submitAPI(values);
        if (success) {
          resetForm();
          setLoading(false);
          navigate("/ConfirmedBooking");
        } else {
          alert("Failed to submit reservation.");
        }
      } catch (error) {
        setLoading(false);
        console.error("Error submitting reservation:", error);
        alert("An error occurred while submitting the reservation.");
      }
      setSubmitting(false);
    },
  });

  return (
    <section id="reservation">
      <VStack p={32} alignItems="flex-start">
        <Heading as="h1" id="Book-Now">
          Book Now
        </Heading>

        <Box p={6} rounded={"md"} w={"100%"}>
          <form onSubmit={formik.handleSubmit} noValidate>
            <VStack spacing={4} alignItems={"flex-start"}>
              <FormControl
                isInvalid={formik.touched.date && formik.errors.date}
              >
                <FormLabel htmlFor="date">
                  Choose date <span>*</span>
                </FormLabel>
                <Input
                  id="date"
                  name="date"
                  type="date"
                  {...formik.getFieldProps("date")}
                  required
                  onChange={(e) => {
                    formik.handleChange(e); // Formik state update
                    // console.log(e.target.value); // Log the value
                    onDateChange(new Date(e.target.value)); // Update available times
                  }}
                  value={formik.values.date}
                />
                {formik.errors.date ? (
                  <FormErrorMessage>{formik.errors.date}</FormErrorMessage>
                ) : null}
              </FormControl>

              <FormControl
                isInvalid={formik.touched.resTime && formik.errors.resTime}
              >
                <FormLabel htmlFor="resTime">
                  Choose time <span>*</span>
                </FormLabel>
                <Select
                  id="resTime"
                  placeholder="Select option"
                  {...formik.getFieldProps("resTime")}
                  required
                >
                  {Array.isArray(availableTimes) &&
                    availableTimes.map((time) => (
                      <option key={time}>{time}</option>
                    ))}
                </Select>
                {formik.errors.resTime ? (
                  <FormErrorMessage>{formik.errors.resTime}</FormErrorMessage>
                ) : null}
              </FormControl>

              <FormControl
                isInvalid={formik.touched.guests && formik.errors.guests}
              >
                <FormLabel htmlFor="guests">
                  Number of Guests <span>*</span>
                </FormLabel>
                <NumberInput
                  id="guests"
                  min={1}
                  max={10}
                  {...formik.getFieldProps("guests")}
                  value={formik.values.guests} // Bind the value from Formik state
                  onChange={(valueString) => {
                    // Convert valueString to a number and update Formik state
                    formik.setFieldValue("guests", Number(valueString));
                  }}
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>

                {formik.errors.guests ? (
                  <FormErrorMessage>{formik.errors.guests}</FormErrorMessage>
                ) : null}
              </FormControl>

              <FormControl
                isInvalid={formik.touched.occasion && formik.errors.occasion}
              >
                <FormLabel htmlFor="occasion">
                  Occasion <span>*</span>
                </FormLabel>
                <Select
                  placeholder="Choose an occasion"
                  id="occasion"
                  name="occasion"
                  {...formik.getFieldProps("occasion")}
                >
                  <option value={"Birthday"}>Birthday</option>
                  <option value={"Anniversary"}>Anniversary</option>
                </Select>
                {formik.errors.occasion ? (
                  <FormErrorMessage>{formik.errors.occasion}</FormErrorMessage>
                ) : null}
              </FormControl>

              <Button
                type="submit"
                isLoading={loading}
                loadingText="Submitting"
              >
                Submit
              </Button>
              <p>
                <span>*</span> - required fields
              </p>
            </VStack>
          </form>
        </Box>
      </VStack>
    </section>
  );
}
