import Image from "next/image";
import logo from "../../public/images/TestLogo@2x.png"
import home from "../../public/images/home_FILL0_wght300_GRAD0_opsz24@2x.png"
import Patientsicon from "../../public/images/group_FILL0_wght300_GRAD0_opsz24@2x.png"
import Schedule from "../../public/images/calendar_today_FILL0_wght300_GRAD0_opsz24@2x.png"
import chat from "../../public/images/chat_bubble_FILL0_wght300_GRAD0_opsz24@2x.png"
import credit from "../../public/images/credit_card_FILL0_wght300_GRAD0_opsz24@2x.png"
import doctor from "../../public/images/senior-woman-doctor-and-portrait-smile-for-health-2023-11-27-05-18-16-utc@2x.png"
import dots from "../../public/images/more_vert_FILL0_wght300_GRAD0_opsz24@2x.png"
import dotsh from "../../public/images/more_horiz_FILL0_wght300_GRAD0_opsz24@2x.png"
import setting from "../../public/images/settings_FILL0_wght300_GRAD0_opsz24@2x.png"
import search from "../../public/images/search_FILL0_wght300_GRAD0_opsz24@2x.png"
import laungh from "../../public/images/respiratory rate@2x.png"
import heart from "../../public/images/HeartBPM@2x.png"
import temp from "../../public/images/temperature@2x.png"
import birthicon from "../../public/images/BirthIcon@2x.png"
import female from "../../public/images/FemaleIcon@2x.png"
import download from "../../public/images/download_FILL0_wght300_GRAD0_opsz24 (1)@2x.png"
import insurance from "../../public/images/InsuranceIcon@2x.png"
import phone from "../../public/images/PhoneIcon@2x.png"
import arwodown from "../../public/images/ArrowDown@2x.png"
import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart ,
   CategoryScale,
   LinearScale,
   PointElement,
   LineElement,
   Title,
   Tooltip,
   Legend
   } from "chart.js";

Chart.register(CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend);



export default function Home() {



  const [Data,SetData]=useState(null)
  const [Patients,setPatients]=useState([])
  const [PatientJessica,setPatientJessica]=useState(null)
  const [PatientJessica2,setPatientJessica2]=useState([])
  const [diagnostic_list,setdiagnostic_list]=useState([])
  const [Lab_results,setLab_results]=useState([])
  const[chartdatadis,setchartdatadis]=useState([])
  const[chartdataais,setchartdataais]=useState([])



//fetch te data

  useEffect(()=>{

let url = 'https://fedskillstest.coalitiontechnologies.workers.dev';
let username = 'coalition';
let password = 'skills-test';

let headers = new Headers();
headers.set('Authorization', 'Basic ' + btoa(username + ":" + password));

fetch(url, {method:'GET',
        headers: headers,
       })
.then(response => response.json())
.then(Data => SetData(Data));

      },[])



//check for data exist before extracting the info

      useEffect(()=>{
          if(Data){
            extractPatients(Data)
            
          }
          if(PatientJessica){
              extractChartData(PatientJessica)
          }
      },[Data,PatientJessica])


//extract patients info

function extractPatients(data){
        let patient=[]
        let Patient_name,Patient_gender,Patient_age,Patient_pic,key,diagnostic_list

          for(let i=0;i<data.length;i++){
              key=i
               Patient_name=data[i].name
               Patient_gender=data[i].gender
               Patient_age=data[i].age
               Patient_pic=data[i].profile_picture
               diagnostic_list=data[i].diagnostic_list
        
              patient.push({key,Patient_name,Patient_gender,Patient_age,Patient_pic})
              if(i==3){
                setPatientJessica(data[i])
                setdiagnostic_list(diagnostic_list)
                setPatientJessica2(data[i])
                
              }
            }
            setPatients(patient)
      }
      

//extract chart data

function extractChartData(data){
        let diastolic =[]
        let systolic=[]
        let diagnosis_history=data.diagnosis_history
        let Lab_results=data.lab_results
        for(let i=0;i<6;i++){
            diastolic.push(diagnosis_history[i].blood_pressure.diastolic.value)
            systolic.push(diagnosis_history[i].blood_pressure.systolic.value)
        }
        setchartdatadis(diastolic.reverse())
        setchartdataais(systolic.reverse())
        setLab_results(Lab_results)
      }




      //chart data
      
        let chartData={
          labels:[
            "oct,2023",
            "nov,2023",
            "dec,2023",
            "jan,2024",
            "feb,2024",
            "marc,2024"
          ],
          datasets:[
            {
              label:"diastolic",
              data:chartdatadis,
              borderColor:"#8C6FE6",
              tension: 0.5,
            },
            {
              label:"Systolic",
              data:chartdataais,
              borderColor:"#E66FD2",
              tension: 0.5,
            }
          ]
        }

  return (
    <>

    {/* header start */}
    <header className="flex m-4 items-center justify-between">
      <div className="w-1/5 p-3">
        <Image src={logo} alt="logo" className="logo" />
      </div>
      <div className="w-3/5">
        <ul className="flex gap-8 justify-center">
          <li className="flex gap-2 items-center">
            <Image src={home} alt="logo" className="header-logo"/>
            <p>Overview</p>
          </li>
          <li className="flex gap-2 items-center header-active">
            <Image src={Patientsicon} alt="logo" className="header-logo"/>
            <p>Patients</p>
          </li>
          <li className="flex gap-2 items-center">
            <Image src={Schedule} alt="logo"className="header-logo" />
            <p>Schedule</p>
          </li>
          <li className="flex gap-2 items-center">
            <Image src={chat} alt="logo"className="header-logo"/>
            <p>Message</p>
          </li>
          <li className="flex gap-2 items-center">
            <Image src={credit} alt="logo"className="header-logo"/>
            <p>Transactions</p>
          </li>
        </ul>
      </div>
      <div className="w-1/5">
        <div className=" flex gap-2 items-center">
          <Image src={doctor} alt="logo" className="doctor"/>
          <span className="info">
            <h4 className="font-bold">Dr. Jose Simmons</h4>
            <p className="text-sm text-gray-500">General Practitioner</p>
          </span>
          
          <Image src={setting} alt="logo" width={20} className="cursor-pointer"/>
          <Image src={dots} alt="logo" width={5} className="cursor-pointer"/>
        </div>
      </div>
    </header>

    {/* header end */}


    {/* main */}
    <section className="main flex m-5">


    {/* patients list start */}
      <div className="patients w-1/5">
            <div className="patients-header flex justify-between p-4 items-center">
              <h1 className="font-bold text-2xl">Patients</h1>
              <Image src={search} alt="search" className="search-icon"/>
            </div>

            <div className="patients-list">

            {Patients.map((patient)=>(
                <>
                  <div className={`${patient.key==3?"patient-active":""} patient items-center flex gap-2 p-4`} key={patient.key}>
                <img src={patient.Patient_pic} alt="logo" className="patient-pic"/>
                <div className="">
                  <h4 className="font-semibold">{patient.Patient_name}</h4>
                  <span className="flex gap-2 text-sm text-gray-500">
                    <p>{patient.Patient_gender},</p>
                    <p>{patient.Patient_age}</p>
                    </span>
                  
                </div>
               <Image src={dotsh} alt="dot" className="doth"/>
              </div>
                </>
              ))}

               
            </div>
      </div>

    {/* patients list end */}


    {/* history start */}
      <section className="history w-3/5 "> 
      <div className="history-main p-5 mx-4">
      <h1 className="header mx-2 my-5 text-3xl font-semibold">
          Diagnosis History
          </h1>
        <div className="line-canva">

            <div className="canvaheader flex">
              <h2 className="text-2xl">Blood Pressure</h2>
              <div className="flex items-baseline gap-1">
                <span className="">Last 6 months</span>
                <Image src={arwodown} className="arrow" alt="pic"/>
              </div>
              </div>




              <div className="flex gap-8">
                <Line options={null} data={chartData}  className="line-chart"/>
                <div className="chart-info ">
                      <div className="relative text-center mb-4 border-b-2 border-indigo-200 pb-5">
                        <div className="sysdot"></div>
                        <p className="my-3 font-semibold">Systolic</p>
                        <p className="my-3 font-bold text-2xl">160</p>
                        <p className="text-gray-500">Higher than Average</p>
                      </div>
                      <div className="relative text-center">
                        <div className="sysdot disdot"></div>
                        <p className="my-3 font-semibold">Diastolic</p>
                        <p className="my-3 font-bold text-2xl">78</p>
                        <p className="text-gray-500">Lower than Average</p>
                      </div>
                </div>
                </div>

                
          
        </div>

        {/* status start */}
        <div className="status flex gap-2">
                  <div className="staute" style={{backgroundColor:"#E0F3FA"}}>
                    <Image src={laungh} className="status-image " alt="pic"/>
                  <p className="my-3">Respiratory Rate</p>
                  <h2 className="text-3xl font-bold my-3">20 bpm</h2>
                  <p>Normal</p>
                  </div>
                  <div className="staute" style={{backgroundColor:"#FFE6E9"}}>
                    <Image src={temp} className="status-image " alt="pic"/>
                  <p className="my-3">Temperature</p>
                  <h2 className="text-3xl font-bold my-3">98.6°F</h2>
                  <p>Normal</p>
                  </div>
                  <div className="staute" style={{backgroundColor:"#FFE6F1"}}>
                    <Image src={heart} className="status-image " alt="pic"/>
                  <p className="my-3">Heart Rate</p>
                  <h2 className="text-3xl font-bold my-3">78 bpm</h2>
                  <p>Lower than Average</p>
                  </div>
                  
                </div>
                </div>
                {/* status end */}

                <div className="Diagnostic-list p-5 mx-4 my-4">
                  <h1 className="text-2xl font-bold my-5">Diagnostic List</h1>
                  <div className="diag-header mb-4 flex font-semibold">
                      <p className="w-1/5">Problem/Diagnosis</p>
                      <p className="w-3/5 ml-6">Description</p>
                      <p className="w-1/5">Status</p>
                  </div>
                  {diagnostic_list.map(patient=>(
                    <div className="p-5 my-2 flex ">
                    <p className="w-1/5">{patient.name}</p>
                    <p className="w-3/5 ml-6">{patient.description}</p>
                    <p className="w-1/5">{patient.status}</p>
                </div>
                  ))}
                </div>

      </section>

    {/* history end */}
      

    {/* patient info start */}
      <section className="w-1/5">
        <div className="patient-info mb-6 content-center">
          <div className="patient-image">
            <img src={`${PatientJessica2.profile_picture}`} alt="pic" />
            <h1 className="text-center text-2xl font-semibold my-4">{PatientJessica2.name}</h1>
          </div>
          <div className="">
            <div className="information flex p-4 m-3 gap-2">
              <Image src={birthicon} className="information-icon"/>
              <div className="">
                <p >Date Of Birth</p>
                <p className="font-bold">{PatientJessica2.date_of_birth}</p>
              </div>
            </div>
            <div className="information flex p-4 m-3 gap-2">
              <Image src={female} className="information-icon"/>
              <div className="">
                <p >Gender</p>
                <p className="font-bold">{PatientJessica2.gender}</p>
              </div>
            </div>
            <div className="information flex p-4 m-3 gap-2">
              <Image src={phone} className="information-icon"/>
              <div className="">
                <p >Contact Info.</p>
                <p className="font-bold">{PatientJessica2.phone_number}</p>
              </div>
            </div>
            <div className="information flex p-4 m-3 gap-2">
              <Image src={phone} className="information-icon"/>
              <div className="">
                <p >Emergency Contacts</p>
                <p className="font-bold">{PatientJessica2.emergency_contact}</p>
              </div>
            </div>
            <div className="information flex p-4 m-3 gap-2">
              <Image src={insurance} className="information-icon"/>
              <div className="">
                <p >Insurance Provider</p>
                <p className="font-bold">{PatientJessica2.insurance_type}</p>
              </div>
            </div>
          </div>
          <button type="button">Show All Information</button>
        </div>

        <div className="Lab_results my-4">
          <h1 className="text-2xl font-semibold p-3 my-4">Lab_results</h1>

          {Lab_results.map(result=>(
            <div className="Lab_result mx-2 my-3 p-4 justify-between flex">
            <p>{result}</p>
            <Image src={download} className="lab-icon"/>
          </div>
          ))}

          
        </div>

        {/* patient info start */}
      </section>


    </section>
    </>
  );
}
