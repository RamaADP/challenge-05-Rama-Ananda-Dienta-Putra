

showSideBarMenu = () => {
    const element = document.getElementById("sideBar_Menu");
    const element2 = document.getElementById("main");
    const element3 = document.getElementById("sideBar_List");
    if(!element.classList.contains('active')) {
        element.classList.add('active');
    } else {
        element.classList.remove('active');
    }
    if(element2.classList.contains('col-10')) {
        element2.classList.remove('col-10');
    } else {
        element2.classList.remove('col-12');
        element2.classList.add('col-10');
    }
    if(!element3.classList.contains('bg-lightblue')) {
        element3.classList.add('bg-lightblue');
        element3.style.opacity = 0.95;
    } 
    // else{
    //     element3.classList.add('bg-lightblue');
    //     element3.style.opacity = 1;
    // }
}

addNewCarMenu = () => {
    const element = document.getElementById("cars_Category");
    const element2 = document.getElementById("addNewCar_Button")
    if(!element.classList.contains('d-none')) {
        element.classList.add('d-none');
    }
    if(!element2.classList.contains('d-none')) {
        element2.classList.add('d-none');
    }
    
}



