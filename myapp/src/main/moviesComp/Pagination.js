import React,{useState} from 'react';

const Pagination = ({PostsPerPage,totalPosts,paginate}) => {
    const pageNumber = []
    let [selectedPage,setselectedPage] = useState(1)

    let Class = "w-12 md:flex justify-center items-center hidden  cursor-pointer leading-5 transition duration-150 ease-in  rounded-full hover:bg-gray-600  "
    let selectedClass = " bg-gray-600 text-white w-12 md:flex justify-center items-center hidden  cursor-pointer leading-5 transition duration-150 ease-in  rounded-full "
    let totalPages = totalPosts/PostsPerPage

    for(let i = 1 ;  i <= Math.ceil(totalPages) ; i++ ){
        pageNumber.push(i)

        
    };

    const changeCheck = (number) =>{
        setselectedPage(number)
        // pageObj[number].props.className = "selectedClass" 
    }

    const backPage = (number) =>{
        if(number == 1){
            setselectedPage(1) 
        }
        else{
            setselectedPage(number-1)
        }

    }

    const nextPage = (number) =>{
        if(number == 12){
            setselectedPage(12) 
        }
        else{
            setselectedPage(number+1)
        }
       
        

    }

    let pageObj = pageNumber.map((number,index)=>{
    return    <a href="#" key={number} onClick={() => {paginate(number) ; changeCheck(number);}} className={Class}>{number}</a>

        
    })
    return (
        <div>
            
            <div className="flex flex-col items-center my-12">
    <div className="flex text-gray-800">
        <div  onClick={() => {paginate(selectedPage) ; backPage(selectedPage);}} className=" h-12 w-12 mr-1 flex justify-center items-center rounded-full bg-gray-200 cursor-pointer">

            <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-chevron-left w-6 h-6">
                <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
        </div>


        <div className="flex h-12 mx-2 font-medium rounded-full bg-gray-200">
        

            
        {pageObj}
           
        </div>
        <div onClick={() => {paginate(selectedPage) ; nextPage(selectedPage);}} className="h-12 w-12 ml-1 flex justify-center items-center rounded-full bg-gray-200 cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg"  width="100%" height="100%" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-chevron-right w-6 h-6">
                <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
        </div>
    </div>
</div>
     </div>        
    );
};

export default Pagination;
