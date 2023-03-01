import { ArrowDownCircle } from "react-ionicons"

const About = () => {
  return (
    <div className="dark:text-white text-center max-h-[90vh] overflow-y-auto pb-10">
      <span className="fixed lg:hidden top-26 right-8 animate-bounce"><ArrowDownCircle color="pink" /></span>
      <p className="text-4xl font-bold text-rose-300">Meet the Team</p>
      <div className="lg:flex lg:items-center lg:justify-evenly">
        <div className="mt-10 p-2">
          <p className="uppercase font-bold dark:text-orange-200 text-orange-600">Mentors</p>
          <div className="flex items-center justify-between w-fit max-w-[24rem] md:w-[28rem] p-2 border-orange-300 border-2 m-auto mt-2 mb-2 rounded-xl">
            <img src="https://i.ibb.co/m5TzFzJ/BG-Razzak-Final-PP-prev-ui.png" className="w-24 rounded-xl" alt="" />
            <div className="text-left mr-auto ml-6">
              <p className="font-bold text-lg">Supervisor</p>
              <p className="text-base text-indigo-400">Brig Gen Md Abdur Razzak, SUP, psc</p>
              <p className="text-sm">Former Head of the Department, Department of Computer Science & Engineering (CSE)</p>
              <a className="lowercase text-sky-400 cursor-pointer text-sm" href="https://mist.ac.bd/department/cse/facultyMembers/col_md_abdur_razzak_sup_psc-405">Profile</a>
            </div>
          </div>
          <div className="flex items-center justify-between w-fit max-w-[24rem] md:w-[28rem] p-2 border-orange-300 border-2 m-auto mt-2 mb-2 rounded-xl">
            <img src="https://i.ibb.co/f2Ss5Kf/Raiyan-pp-910x1024-prev-ui.png" className="w-24 rounded-xl" alt="" />
            <div className="text-left mr-auto ml-6">
              <p className="font-bold text-lg">Co-Supervisor</p>
              <p className="text-base text-indigo-400">Raiyan Rahman</p>
              <p className="text-sm">Lecturer, Department of Computer Science & Engineering (CSE)</p>
              <a className="lowercase text-sky-400 cursor-pointer text-sm" href="https://mist.ac.bd/department/cse/facultyMembers/raiyan_rahman-17">Profile</a>
            </div>
          </div>
          <div className="flex items-center justify-between w-fit max-w-[24rem] md:w-[28rem] p-2 border-orange-300 border-2 m-auto mt-2 mb-2 rounded-xl">
            <img src="https://i.ibb.co/x7nPc3m/Dr-removebg-preview-prev-ui.png" className="w-24 rounded-xl" alt="" />
            <div className="text-left mr-auto ml-6">
              <p className="font-bold text-lg">Advisor</p>
              <p className="text-base text-indigo-400">Dr. Md. Mahbubur Rahman</p>
              <p className="text-sm">Professor, Department of Computer Science & Engineering (CSE)</p>
              <a className="lowercase text-sky-400 cursor-pointer text-sm" href="https://mist.ac.bd/department/cse/facultyMembers/dr_md_mahbubur_rahman-2">Profile</a>
            </div>
          </div>
        </div>
        <div className="mt-10 p-2">
          <p className="uppercase dark:text-cyan-200 font-bold text-cyan-600">Students</p>
          <div className="flex items-center justify-between w-fit max-w-[24rem] md:w-[28rem] p-2 border-orange-300 border-2 m-auto mt-2 mb-2 rounded-xl">
            <img src="https://i.ibb.co/qg3snsp/shad.jpg" className="w-24 rounded-xl" alt="" />
            <div className="text-left mr-auto ml-6">
              <p className="font-bold text-lg">Website Developer</p>
              <p className="text-base text-indigo-400">Shad Reza</p>
              <p className="text-sm">Student of B.Sc in CSE from MIST [Final Year]</p>
              <p className="mt-4">
                <a className="lowercase text-sky-400 cursor-pointer text-sm" href="https://shadreza-portfolio-shadreza.vercel.app/">Profile</a>
              </p>
            </div>
          </div>
          <div className="flex items-center justify-between w-fit max-w-[24rem] md:w-[28rem] p-2 border-orange-300 border-2 m-auto mt-2 mb-2 rounded-xl">
            <img src="https://i.ibb.co/ZcxcQ1T/masum-prev-ui.png" className="w-24 rounded-xl" alt="" />
            <div className="text-left mr-auto ml-6">
              <p className="font-bold text-lg">ML Model Developer</p>
              <p className="text-base text-indigo-400">Md Abdullah Al Masum</p>
              <p className="text-sm">Student of B.Sc in CSE from MIST [Final Year]</p>
              <a className="lowercase text-sky-400 cursor-pointer text-sm" href="https://github.com/MasumBhai">Profile</a>
            </div>
          </div>
          <div className="flex items-center justify-between w-fit max-w-[24rem] md:w-[28rem] p-2 border-orange-300 border-2 m-auto mt-2 mb-2 rounded-xl">
            <img src="https://i.ibb.co/8sysTpx/emon-prev-ui.png" className="w-24 rounded-xl" alt="" />
            <div className="text-left mr-auto ml-6">
              <p className="font-bold text-lg">DL Model Developer</p>
              <p className="text-base text-indigo-400">Md Abdullah Al Emon</p>
              <p className="text-sm">Student of B.Sc in CSE from MIST [Final Year]</p>
              <a className="lowercase text-sky-400 cursor-pointer text-sm" href="https://github.com/emon49">Profile</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About