import React, { useState } from "react";
import CommonNextButton from "../../Common/Button/Button";
import ThankYouModal from "../../Common/Modal/ThankYouModal";
import loaderLogoGif from "../../../../public/assets/logo-loader.gif";
import { staticLabels } from "@/commonUtils/StaticContent/staticLabels";
import CommonInputLabel from "../../Common/CommonInputComponents/CommonInputLabel";
import axios from "axios";
import { BASE_URL, USERINFO } from "@/commonUtils/ApiEndPoints/ApiEndPoints";
import { getName, removeSpecialCharacters } from "@/commonUtils/util";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import InfoModal from "../../Common/Modal/InfoModal";

const EmploymentInfoForm = ({
  userInputData,
  handleChange,
  setDetailsFormStepper,
  setUserInputData,
  etbCustomerData,
  deviceId,
  ipAddress,
  setApplicationRefNo,
  setEpfNumber,
  setShowCongratsScreen,
  setRejectionScreen,
  setShowLoader,
  setLoginStepper,
}) => {
  const router = useRouter();
  console.log(userInputData,"userInputDatauserInputData");
  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  };
  const isSalaried = userInputData?.occupationType === "Salaried";
  const selfEmployed = userInputData?.occupationType === "Self employed";

  const incomeValue = isSalaried
    ? userInputData?.monthly_salary
    : userInputData?.itr_amount;

  const department = isSalaried ? userInputData?.department : true;

  const employmentDisable = !incomeValue || !department;
  // const token = localStorage.getItem("token") ;
  const token =  localStorage.getItem("token");
  console.log(token,"tokentoken");

  const [showLoaderModal, setShowLoaderModal] = useState(false);

  const inPrincipleApprovalApi = (id, refNo, tokenValue) => {
    setShowLoaderModal(true);
    const enpoint = BASE_URL + USERINFO?.inPrincipleApproval;
    const params = {
      application_reference_number: String(refNo),
      e_ref_num: String(id),
      customer_id: etbCustomerData?.CUSTOMER_ID || "",
      device_id: deviceId,
      jwt_token: tokenValue,
    };
    axios
      .post(enpoint, params, { header: headers })
      .then((res) => {
        setShowLoaderModal(false);
        const resObj =
          res?.data?.data?.executeIPARequestResponse?.executeIPARequestReturn;
        const ipaRes = resObj?.APS_IPA_RESULT;
        console.log(res?.date?.message, "resresresresres");
        const filler1 = resObj?.FILLER1;
        const filler6 = resObj?.FILLER6;
        console.log(res,"resObjresObj");
        if (typeof window !== "undefined") {
          const objToStore = { productIds: filler1, creditLimits: filler6 };
          localStorage.setItem("productsInfo", JSON.stringify(objToStore));
          localStorage.setItem("customerData", JSON.stringify(userInputData));
        }
        const hasNoProduct = filler1 && filler1 == "" && filler6 && filler6 == "";
        
        const hasProducts =
          filler1 && filler1 !== "" && filler6 && filler6 !== ""; // to map on the basis of response
          const hasRejectedProduct = !hasNoProduct && !hasProducts;
        setLoginStepper(4);
        // in response - there will be 3 scenarios - to check on the basis of res data
        if (ipaRes === "Y" && hasRejectedProduct) setRejectionScreen(true);
        // router.push("/infomodal")
        if (ipaRes === "N" && hasProducts)
          router.push("/bankOfBoard/eligible-products");
        if (ipaRes === "N" && hasNoProduct) {
          router.push("/additionalInfo");
        }
        // setShowCongratsScreen(true);
      })
      .catch((error) => {
        setShowLoaderModal(false);
        console.log("error in api interface api", error);
      });
  };
  console.log(userInputData?.dob, "userInputData?.dob")

  const formattedDateOfBirth = userInputData?.date_of_birth
    ? new Date(userInputData?.date_of_birth).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
    : "";
  // EXECUTE INTERFACE API CALL
  const handleSubmitForm = async () => {
    const name = getName(userInputData);
    setShowLoader(true);
    const params = {
      bank_account_number: String(etbCustomerData?.FW_ACCNT_NUM),
      adress_edit_flag: "N",
      customer_id: etbCustomerData?.CUSTOMER_ID ? etbCustomerData?.CUSTOMER_ID : "",
      auth_mode: etbCustomerData?.CUSTOMER_ID ? "IDCOM" : "OTP",
      address_line_1:
        removeSpecialCharacters(etbCustomerData?.V_D_CUST_ADD1) ||
        userInputData?.address1,
      address_line_2:
        removeSpecialCharacters(etbCustomerData?.V_D_CUST_ADD2) ||
        userInputData?.address2,
      address_line_3:
        removeSpecialCharacters(etbCustomerData?.V_D_CUST_ADD3) ||
        userInputData?.address3,
      city: etbCustomerData?.V_D_CUST_CITY || userInputData?.city || "surat",
      mobile_no: userInputData?.mobile,
      dob: etbCustomerData?.D_D_CUST_DATE_OF_BIRTH || formattedDateOfBirth || "",
      name: name,
      ip: ipAddress,
      email: etbCustomerData?.V_D_CUST_EMAIL_ADD || userInputData?.email,
      pincode: etbCustomerData?.V_D_CUST_ZIP_CODE || userInputData?.pin_code,
      company_name: userInputData?.companyName,
      pan_no: etbCustomerData?.V_D_CUST_IT_NBR || userInputData?.pan_no,
      device_id: deviceId,
      jwt_token: token,
      office_address_line_1: '',
      office_address_line_2: '',
      office_address_line_3: '',
      office_address_city: '',
      office_address_state: '',
      office_address_pincode: (etbCustomerData?.V_D_CUST_ZIP_CODE || userInputData?.pin_code)?.toString(),
      office_address_email: '',
      pan_name_match_flag: "",
      pan_dob_match_flag: ""
    };
    console.log(etbCustomerData, userInputData, "userInputDatauserInputData");
    await axios
      .post(BASE_URL + USERINFO.executeInterface, params, {
        headers: headers,
      })
      .then((response) => {
        setShowLoader(false);
        const epf =
          response?.data?.data?.executeInterfaceRequestResponse
            ?.executeInterfaceRequestReturn?.APS_E_REF_NUM;
        const applicationRef =
          response?.data?.data?.executeInterfaceRequestResponse
            ?.executeInterfaceRequestReturn?.APS_APPL_REF_NUM;
        const token = response?.data?.data?.token;
        console.log(response?.data, "response?.data");
        setApplicationRefNo(
          response?.data?.data?.executeInterfaceRequestResponse
            ?.executeInterfaceRequestReturn?.APS_APPL_REF_NUM
        );
        setEpfNumber(
          response?.data?.data?.executeInterfaceRequestResponse
            ?.executeInterfaceRequestReturn?.APS_E_REF_NUM
        );

        // CALL IN PRINCIPLE INTERFACE API
        inPrincipleApprovalApi(epf, applicationRef, token);
      })
      .catch((error) => {
        setShowLoader(false);
        toast.error(error?.message || error?.res?.data?.detail);
      });
  };

  return (
    <>
      <div>
        <label
          className="text-neutral-800 text-[13px] font-normal font-['Poppins']"
          htmlFor="occupation-type"
        >
          {staticLabels?.occupationType}
        </label>
        <div className="flex pt-[10px] gap-4 ">
          <div>
            <label
              htmlFor="salaried"
              className={`form-radio flex gap-2 items-center ${isSalaried ? "text-[#212529]" : "text-[#808080]"
                }`}
            >
              <input
                type="radio"
                name="occupationType"
                value={isSalaried || "Salaried"}
                checked={isSalaried}
                onChange={(e) => {
                  handleChange(e);
                }}
              />
              Salaried
            </label>
          </div>
          <div>
            <label
              htmlFor="self employed"
              className={`form-radio flex gap-2 items-center  ${selfEmployed ? "text-[#212529]" : "text-[#808080]"
                }`}
            >
              <input
                type="radio"
                name="occupationType"
                value={selfEmployed || "Self employed"}
                checked={selfEmployed}
                onChange={(e) => {
                  handleChange(e);
                }}
              />
              Self employed
            </label>
          </div>
        </div>
        {userInputData?.occupationType && (
          <>
            <div className="flex flex-col gap-[2px] mt-[20px]">
              <label
                className="text-neutral-800 text-[13px] font-normal font-['Poppins']"
                htmlFor="employment company name"
              >
                {staticLabels?.companyName}
              </label>
              <input
                id="company_name"
                name="company_name"
                type="text"
                required
                placeholder={staticLabels?.companyName}
                className={`shadow border rounded-lg w-full py-4 text-[12px] px-4 text-[#212529] leading-tight focus:outline-none focus:shadow-outline mt-1 border-[#C2CACF] 
              `}
                onChange={(e) =>
                  setUserInputData({
                    ...userInputData,
                    companyName: e?.target?.value,
                  })
                }
                value={userInputData?.companyName}
                maxLength={50}
              />
            </div>
            {isSalaried && (
              <div className="flex flex-col gap-[2px] mt-[20px]">
                <CommonInputLabel labelTitle={staticLabels?.department} />
                <input
                  id="department"
                  name="department"
                  type="text"
                  required
                  placeholder={staticLabels?.department}
                  className={`shadow border rounded-lg w-full py-4 text-[12px] px-4 text-[#212529] leading-tight focus:outline-none focus:shadow-outline mt-1 border-[#C2CACF] 
              `}
                  onChange={(e) =>
                    setUserInputData({
                      ...userInputData,
                      department: e?.target?.value,
                    })
                  }
                  value={userInputData?.department}
                  maxLength={50}
                />
              </div>
            )}
            <div className="flex flex-col gap-[2px] mt-[20px]">
              <CommonInputLabel labelTitle={staticLabels?.designation} />
              <input
                id="designation"
                name="designation"
                type="text"
                required
                placeholder={"Enter you designation"}
                className={`shadow border rounded-lg w-full text-[12px]  py-4 px-4 text-[#212529] leading-tight focus:outline-none focus:shadow-outline mt-1 border-[#C2CACF] 
              `}
                onChange={(e) =>
                  setUserInputData({
                    ...userInputData,
                    designation: e?.target?.value,
                  })
                }
                value={userInputData?.designation}
                maxLength={50}
              />
            </div>
            {isSalaried ? (
              <div className="mt-[15px]">
                <CommonInputLabel labelTitle={staticLabels?.monthlyIncome} />
                <input
                  className={`shadow border rounded-lg w-full py-4 px-4 text-[#212529] text-[12px] leading-tight focus:outline-none focus:shadow-outline mt-1 border-[#C2CACF]`}
                  id="monthly_salary"
                  name="monthly_salary"
                  value={
                    Math.floor(userInputData?.monthly_salary) === 0
                      ? ""
                      : userInputData?.monthly_salary
                  }
                  onChange={(e) => {
                    handleChange(e);
                  }}
                  type="number"
                  placeholder="908344"
                />
              </div>
            ) : (
              <div className="mt-[15px]">
                <CommonInputLabel labelTitle={staticLabels?.annualItr} />
                <input
                  className={`shadow border rounded-lg w-full py-4 px-4 text-[#212529] text-[12px] leading-tight focus:outline-none focus:shadow-outline mt-1 border-[#C2CACF]`}
                  id="itr_amount"
                  name="itr_amount"
                  value={
                    Math.floor(userInputData?.itr_amount) === 0
                      ? ""
                      : userInputData?.itr_amount
                  }
                  onChange={(e) => {
                    handleChange(e);
                  }}
                  type="number"
                  placeholder="0000"
                />
              </div>
            )}
            <CommonNextButton
              title="Submit"
              disable={employmentDisable}
              handleSubmit={() => {
                handleSubmitForm();
                // setShowLoaderModal(true);
              }}
            />
          </>
        )}
      </div>
      <div>
        {showLoaderModal && (
          <ThankYouModal
            title="Please Wait as it may take 
            upto 60 seconds"
            subTitle="We are submitting your details to our co-brand credit card partner."
            image={loaderLogoGif}
            buttonText="Okay"
            width="w-[460px] max-sm:w-[343px]"
            handleButtonClick={() => setDetailsFormStepper(4)}
          />
        )}


      </div>
    </>
  );
};

export default EmploymentInfoForm;
