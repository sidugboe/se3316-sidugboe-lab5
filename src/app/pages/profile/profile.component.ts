import { Component, OnInit, Inject } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { DOCUMENT, Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { courses } from 'src/app/course';
import { ConfigService } from 'src/app/anauthenticated/anauthenticated.component';
import { usersint } from 'src/app/user';


@Injectable()


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
})


export class ProfileComponent implements OnInit {
  public profileJson = "";
  user;
  activeSch;
  test;

  renderedSchedule;
  enableTimeTableVisibility = false;
  public courses = [];
  public matchingcourses = [];
  public displayfullcourses = [];
  selectedCourses = [];
  createdSchedule: string;
  scheduleInfoObj = {};
  activeSchedule = []; 
  actvieScheduleName: string;
  timeBasedSchedule = {}
  newScheduleEnabled = false;""
  profile = null;
  scheduleDataInfo = {};
  scheduleData: any = {};

  constructor(public auth: AuthService, private _configservice:ConfigService, @Inject(DOCUMENT) private doc: Document) {
    
  }

  createSchedule(){
    let user = this.profile.name;
    let description: string = (document.getElementById("scheduleDescription") as HTMLInputElement).value;
    let visiblity: string = (document.getElementById("visibilityDropDown") as HTMLInputElement).value;
    let name: string = this.createdSchedule;
    let currentTime = new Date();

    if(!this.createdSchedule){
      console.log("Error: Please input something in the Schedule Name box");
    }
    else{
      console.log("schedule " + name + " created");
      this.scheduleData[name] = {};
      console.log(this.scheduleData);
      this.scheduleDataInfo[name] = {creator: user, modified: "", length: 0, description: description, expanded: false, visibility: visiblity};
    }
    this.createdSchedule = "";
    this.newScheduleEnabled =  false; // hide the create schedule options again
    this.updateObject()
    
    
  }

  toggleNewScheduleFields(){
    if(this.newScheduleEnabled){
      this.newScheduleEnabled =  false;
    }else{
      this.newScheduleEnabled = true;
    }
  }

  chooseSchedule(){

    let name = this.activeSch;
    this.activeSchedule = this.scheduleData[name];
    this.actvieScheduleName = name;
  
  }
  
  deleteChosenSchedule() {

    if(this.actvieScheduleName == null || this.actvieScheduleName == "" || this.actvieScheduleName == undefined){
      alert("Please select a schedule to delete.")
      return;
    }
    if(!this.profile){
      alert("you must sign in to access this functionality");
      return;
    }

 
      delete this.scheduleData[name];
      delete this.scheduleDataInfo[name];
      this.activeSchedule = undefined;
      this.actvieScheduleName = undefined;
    
      console.log(this.scheduleData);
      this.updateObject()
      //todo write to database to delete
    



  }
  
  addToSchedule(){
    if(this.actvieScheduleName == null || this.actvieScheduleName == "" || this.actvieScheduleName == undefined){
      alert("Please select a schedule to add courses to it.")
      return;
    }
    if(!this.profile){
      alert("you must sign in to access this functionality");
      return;
    }




    let activeSchedule = this.activeSchedule;
    let name = this.actvieScheduleName;
    let numberOfCourses = this.selectedCourses.length;
  
    console.log(this.scheduleInfoObj);

    this.scheduleData[name] = this.selectedCourses;

    // set new modified date and length for schedule info
    // TODO get modified date format 
    console.log(this.scheduleDataInfo)
      this.scheduleDataInfo[name].length = numberOfCourses;
      this.scheduleDataInfo[name].modified = new Date();
    
    console.log(this.scheduleData);
    this.updateObject()
  }
  


courseSelected(course: object){ 

  let checked = course["checked"];

  if(checked){
    
      this.selectedCourses.push(course);
      console.log(this.selectedCourses);
  }
  else{
    for(let schedule in this.selectedCourses){
      if(this.selectedCourses[schedule] == course){
        
       
          const index = this.selectedCourses.indexOf(this.selectedCourses[schedule], 0);
          if (index > -1) {
            this.selectedCourses.splice(index, 1);
          }
      
        console.log("course removed from selected courses");
        console.log(this.selectedCourses);
      }
    }
  }
}


//added code




timeArray = ["8:30 AM","9:30 AM","10:30 AM","11:30 AM","12:30 PM","1:30 PM","2:30 PM","3:30 PM","4:30 PM","5:30 PM","6:30 PM","7:30 PM","8:30 PM","9:30 PM"]; // used to be times; change in HTML
daysMapObject = {Monday: "M", Tuesday: "Tu", Wednesday: "W", Thursday: "Th", Friday: "F"}; // used to be "days" - change in HTML

generateWeeklySchedule(){
  console.log("inside func");

  if(this.activeSchedule.length == 0){
    console.log("schedule empty");
  }
  this.renderedSchedule = this.actvieScheduleName;

    let formattedTimeTableData = {};
    console.log(formattedTimeTableData);

    for(let time of this.timeArray){
        formattedTimeTableData[time] = {};
    }
    console.log(formattedTimeTableData);


  // add active schedule data to object to be rendered

  for(var courseObject of this.activeSchedule){

    let courseDays = courseObject.course_info[0].days; 
    let courseName = courseObject.className;
    let courseTime = courseObject.course_info[0].start_time;
    let courseInfo = courseObject.catalog_nbr + " " + courseName + " " + courseObject.course_info[0].ssr_component; 

    // add course data to object to be rendered
    for(let day in this.daysMapObject){
      if(courseDays.includes(this.daysMapObject[day])) {  
        // check for conflics
        if(formattedTimeTableData[courseTime][day] == undefined ||formattedTimeTableData[courseTime][courseDays] == "" ) {
          formattedTimeTableData[courseTime][day] = courseInfo;
        }
        else{
          formattedTimeTableData[courseTime][day] += "course conflict: " + courseObject.catalog_nbr;
        }
      }else{
       
        formattedTimeTableData[courseTime][day] = "";
      }        
    }
  }


  // populate rest of table with empty string
for(var timeSlot of Object.keys(formattedTimeTableData)){

    if(Object.keys(formattedTimeTableData[timeSlot]).length === 0){
    
        for(var daySlot in this.daysMapObject){
            formattedTimeTableData[timeSlot][daySlot] = "";
        }
    }
};

  this.timeBasedSchedule = formattedTimeTableData;  // to fix error set line 51 to:   timeBasedSchedule = {}; 
  this.enableTimeTableVisibility = true;
  console.log(this.timeBasedSchedule);
  return;
}


fixKeyvalueOrder(first, second){
  return first;
}


updateObject() {

  let user = this.profile.name;

  let privateScheduleData = {
     scheduleData: {},
     scheduleDataInfo: {}

  };
  let publicScheduleData = {
       scheduleData: {},
       scheduleDataInfo: {}
  };

  
  for(let i = 0; i<Object.keys(this.scheduleDataInfo).length; i++) {
   


    if(this.scheduleDataInfo[Object.keys(this.scheduleDataInfo)[i]].visibility == "private") {
     
      privateScheduleData["scheduleData"][Object.keys(this.scheduleDataInfo)[i]] = this.scheduleData[Object.keys(this.scheduleDataInfo)[i]];
      privateScheduleData["scheduleDataInfo"][Object.keys(this.scheduleDataInfo)[i]] = this.scheduleDataInfo[Object.keys(this.scheduleDataInfo)[i]];

    }
    else if(this.scheduleDataInfo[Object.keys(this.scheduleDataInfo)[i]].visibility == "public") {
     
      publicScheduleData["scheduleData"][Object.keys(this.scheduleDataInfo)[i]] = this.scheduleData[Object.keys(this.scheduleDataInfo)[i]];
      publicScheduleData["scheduleDataInfo"][Object.keys(this.scheduleDataInfo)[i]] = this.scheduleDataInfo[Object.keys(this.scheduleDataInfo)[i]];
          
    }
    else {
      console.log("visibility is not set")
    }
  }


  publicScheduleData["user"] = user;
  privateScheduleData["user"] = user;

  let visiblity: string = (document.getElementById("visibilityDropDown") as HTMLInputElement).value;

   if(visiblity=="public") {
  this._configservice.postPublicScheduleData(publicScheduleData).subscribe(); }
   else if(visiblity=="public") {
  this._configservice.postPrivateScheduleData(privateScheduleData).subscribe();  }



}

ngOnInit(): void {
  let user = this.profile.name;
   
  console.log("on init called");

  this.auth.user$.subscribe(
    (profile) => { 
      let profileJson = JSON.stringify(profile, null, 2);
      this.profile = JSON.parse(profileJson);
      console.log(this.profile);
  });

  

  this._configservice.getPublicScheduleData().subscribe( (data)  => {
    console.log(data);

    
    for(let key of Object.keys(data)){


        if(key == "scheduleDataInfo"){
          for(let i = 0; i< Object.keys(data[key]).length; i++){
            this.scheduleDataInfo[Object.keys(data[key])[i]] = data["scheduleDataInfo"][Object.keys(data["scheduleDataInfo"])[i]]; 
        
          }
        }

      // add scheduleData from returned data to our schedule data 
      
        else if(key == "scheduleData"){
          for(let i = 0; i< Object.keys(data[key]).length; i++){
            this.scheduleData[Object.keys(data[key])[i]] = data["scheduleData"][Object.keys(data["scheduleData"])[i]]; 
            // this.scheduleData[ SCHEDULE NAME ] = collectionItem["scheduleData"] VALUE
          }
        }

        else{
          console.log("something broked returned data has more than scheduleDataInfo and scheduleData properties");
        }
      }
    // setting all courses expanded to false
    for(let courseList of Object.keys(this.scheduleDataInfo)){
      this.scheduleDataInfo[courseList].expanded = false;
    }

  })

    this._configservice.getPrivateScheduleData(user).subscribe( (data)  => {
      console.log(data);
    
          
          for(let key of Object.keys(data)){
    
            
              if(key == "scheduleDataInfo"){
                for(let i = 0; i< Object.keys(data[key]).length; i++){
                  this.scheduleDataInfo[Object.keys(data[key])[i]] = data["scheduleDataInfo"][Object.keys(data["scheduleDataInfo"])[i]]; 
                  // this.scheduleDataInfo[ SCHEDULE NAME ] = collectionItem["scheduleDataInfo"] VALUE
                }
              }
    
            
            
              else if(key == "scheduleData"){
                for(let i = 0; i< Object.keys(data[key]).length; i++){
                  this.scheduleData[Object.keys(data[key])[i]] = data["scheduleData"][Object.keys(data["scheduleData"])[i]]; 
              
                }
              }
    
              else{
                console.log("something broked returned data has more than scheduleDataInfo and scheduleData properties");
              }
          }
         
          for(let courseList of Object.keys(this.scheduleDataInfo)){
            this.scheduleDataInfo[courseList].expanded = false;
          }
      
    })

      


  //-----------------------------------------------------------------------------------
 

  this.displayfullcourses = [];
  this.matchingcourses = [];

  this._configservice.getcourses().subscribe(data => this.courses = data);

  
let subjectInput = (document.getElementById("Subject") as HTMLInputElement).value;
let courseID = (document.getElementById("numb") as HTMLInputElement).value;
let component = (document.getElementById("Component") as HTMLInputElement).value;
let keyWord = (document.getElementById("keyWord") as HTMLInputElement).value;

console.log(subjectInput)

//Search with keyword if subject input = all
if(subjectInput=="All")  {
  if(keyWord.length<4) {
    console.log("Please input a keyword with at least 4 characters") 
  } 
  else {
    for(var string of this.courses)  {
//let lowercasecat = string.catalog_nbr.toLowerCase();
let lowercaseclass = string.className.toLowerCase();
//let catwithoutwhitespaces = lowercasecat.replace(/\s/g, '');
let classNamewithoutspaces = lowercaseclass.replace(/\s/g, '');
let lowercasekeyWord = keyWord.toLowerCase();

      if(classNamewithoutspaces.includes(lowercasekeyWord)) {
        this.matchingcourses.push(string)
  
      }
  
    }
  }
 
  if(this.matchingcourses.length==0) {
console.log("Please input a specific subject or a valid keywoord")  
  }


}

if(!courseID)  {
  console.log("Please input a specific course id")
}



for(var c of this.courses) {

  if(component=="ALL") {

  if (subjectInput === c.subject && courseID == c.catalog_nbr) {
    this.matchingcourses.push(c)
  }

}

else {
  if (subjectInput === c.subject && courseID == c.catalog_nbr && component=== c.course_info[0].ssr_component) {
    this.matchingcourses.push(c)
  }
}
  
}

if (this.matchingcourses.length==0) {
  alert("Please input a valid subject and course id combination")
}
else {
  console.log(this.matchingcourses)
}

}


//search for course stuff

showFullCourseDetails() {

this.displayfullcourses = [];

for(var c of this.matchingcourses) {

  this.displayfullcourses.push(c)
  

} 

console.log(this.displayfullcourses)



}







}