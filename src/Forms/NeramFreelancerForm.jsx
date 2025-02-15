import React, { useState } from 'react'
import { toast } from 'react-toastify';


const NeramFreelancerForm = () => {
   const [isLoading, setIsLoading] = useState(false);
   const SHEET_URL = import.meta.env.VITE_GOOGLE_SHEET_URL;
 
 
   async function handleSubmit(e) {
     e.preventDefault();
     setIsLoading(true);
   
 
     const formData = new FormData(e.target);
 
     try {
       const response = await fetch(
        SHEET_URL,
         {
           method: "POST",
           body: formData
           
         }
       );
       
       const data = await response.text();
       toast.success(data);
       console.log("Success:", data);
       
       
       e.target.reset();
     } catch (error) {
       toast.error('Something went wrong. Please try again.');
       console.error("Error:", error);
     } finally {
       setIsLoading(false);
      
     }
   }
 
   return (
     <div className="min-h-screen bg-gray-50 flex items-center main-bg justify-center px-4">
       <div className="max-w-md w-full space-y-8">
         <div className="text-center">
           <h2 className="mt-6 text-3xl font-bold text-white">
             Neram Freelancer
           </h2>
           <p className="mt-2 text-sm text-violet-50">
             Please fill out the form below
           </p>
         </div>
 
         <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
           <form className="space-y-6" onSubmit={handleSubmit}>
             <div>
               <label 
                 htmlFor="name" 
                 className="block text-sm font-medium text-gray-700"
               >
                 Name
               </label>
               <input
                 id="name"
                 name="Name"
                 type="text"
                 autoComplete='off'
                 required
                 className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500"
                 placeholder="Enter your name"
               />
             </div>
 
             <div>
               <label 
                 htmlFor="works" 
                 className="block text-sm font-medium text-gray-700"
               >
                 Works
               </label>
               <input
                 id="works"
                 name="Works"
                 type="text"
                 autoComplete='off'
                 required
                 className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500"
                 placeholder="Profeession or skill"
               />
             </div>

             <div>
               <label 
                 htmlFor="mobileNumber" 
                 className="block text-sm font-medium text-gray-700"
               >
                 Mobile Number
               </label>
               <input
                 id="mobileNumber"
                 name="MobileNumber"
                 autoComplete='off'
                 type="text"
                 required
                 className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500"
                 placeholder="Enter your mobile number"
               />
             </div>
 
             <div>
               <label 
                 htmlFor="message" 
                 className="block text-sm font-medium text-gray-700"
               >
                 Referal By
               </label>
               <input
                 id="Referal"
                 name="Referal"
                 autoComplete='off'
                 type='text'
                 required
                 className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500"
                 placeholder="Referal Name"
               />
             </div>

             <div>
               <label 
                 htmlFor="message" 
                 className="block text-sm font-medium text-gray-700"
               >
                 Referal Code
               </label>
               <input
                 id="Referalcode"
                 name="Referalcode"
                 type='text'
                 required
                 className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500"
                 placeholder="Referal Code"
               />
             </div>
 
     
{/* <button
  class="relative flex items-center px-6 py-3 overflow-hidden font-medium transition-all bg-indigo-500 rounded-md group"
>
  <span
    class="absolute top-0 right-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-indigo-700 rounded group-hover:-mr-4 group-hover:-mt-4"
  >
    <span
      class="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white"
    ></span>
  </span>
  <span
    class="absolute bottom-0 rotate-180 left-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-indigo-700 rounded group-hover:-ml-4 group-hover:-mb-4"
  >
    <span
      class="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white"
    ></span>
  </span>
  <span
    class="absolute bottom-0 left-0 w-full h-full transition-all duration-500 ease-in-out delay-200 -translate-x-full bg-indigo-600 rounded-md group-hover:translate-x-0"
  ></span>
  <span
    class="relative w-full text-left text-white transition-colors duration-200 ease-in-out group-hover:text-white"
    >Get Started</span
  >
</button> */}

 
             <button
               type="submit"
               disabled={isLoading}
               className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white 
                 ${isLoading 
                   ? 'violet-400 cursor-not-allowed' 
                   : 'bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500'
                 }`}
             >
               {isLoading ? (
                 <span className="flex items-center">
                   <svg 
                     className="animate-spin -ml-1 mr-3 h-5 w-5 text-violet-500" 
                     xmlns="http://www.w3.org/2000/svg" 
                     fill="none" 
                     viewBox="0 0 24 24"
                   >
                     <circle 
                       className="opacity-25" 
                       cx="12" 
                       cy="12" 
                       r="10" 
                       stroke="currentColor" 
                       strokeWidth="4"
                     />
                     <path 
                       className="opacity-75" 
                       fill="currentColor" 
                       d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                     />
                   </svg>
                   Submitting...
                 </span>
               ) : (
                 'Submit'
               )}
             </button>
           </form>
         </div>
       </div>
     </div>
   );
}

export default NeramFreelancerForm