import { Component, ViewChild } from '@angular/core';
import { NavController, Content } from 'ionic-angular';
declare var $: any
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public responeMessage: any = ["Hmm", "Ok", "Sachi", "Hahahaha", "Sahi", "Acha", "Hmmmmm", "G"];
  public typeMessage: string;
  public sayHelloaccordingToDate: string;
  public askQuestion: string;

  public robotData: any = [];
  public askquestionbtn: any = true;
  public showAskBtn: any = false;
  public askbalance: any = false;

  public lastIndex: number = 0;
  constructor(public navCtrl: NavController) {
    setTimeout(() => {
      this.checkdateTime();
    }, 1000);

  }
  checkdateTime() {
    var ndate = new Date();
    var hours = ndate.getHours();
    console.log(hours)
    var message = hours < 12 ? 'Good Morning' : hours < 18 ? 'Good Afternoon' : 'Good Evening';


    $("h3.day-message").text(message);
    console.log(message)
    this.sayHelloaccordingToDate = message;

    this.robotData.push({
      "Message": message,
      "ChildMessage": [
        { "cmessage": "May I Help You Sir?" }
      ],
      "UserResponse": [

      ],
      "showBtn": this.showAskBtn

    });

    console.log(this.robotData);
    console.log(this.robotData.length)
    this.lastIndex = this.robotData.length - 1;
    console.log(this.lastIndex)
  }


  askUserQuestion(question) {
    console.log(question)

    this.askQuestion = question;
    console.log(this.robotData[this.lastIndex]["UserResponse"])
    if (this.robotData[this.lastIndex]["UserResponse"].length == 0) {
      this.robotData[this.lastIndex]["UserResponse"] = [{ "umessage": question }];
      setTimeout(() => {
        this.replyByBoot();
      }, 2000);
    } else {
      this.robotData[this.lastIndex]["UserResponse"].push({ "umessage": question });
    }

    this.typeMessage = '';
  }

  replyByBoot() {
    var rplyMessage;
    var childMessage;

    rplyMessage = this.responeMessage[Math.floor(Math.random() * this.responeMessage.length)];

    // if (this.askQuestion == 'Check Balance') {
    //   rplyMessage = "Your Current Balance is 56,000$";
    //   childMessage = "Do you want to transfer money to other?";
    //   this.askquestionbtn = false;
    //   this.showAskBtn = true;
    // }
    // else if (this.askQuestion == 'Pay Bills') {
    //   rplyMessage = "Ok Sir I am going to pay your Bills";
    //   childMessage = "Thank You Sir for using Chat Box App!";

    // }
    // else if (this.askQuestion == 'E-statement') {
    //   rplyMessage = "Ok Sir I am going to send  your account statement to email";
    //   childMessage = "Thank You Sir for using Chat Bot App!";

    // }

    this.robotData.push({
      "Message": rplyMessage,
      "ChildMessage": [

      ],
      "UserResponse": [

      ],
      "showBtn": this.showAskBtn

    });

    this.lastIndex = this.robotData.length - 1;
    console.log(this.lastIndex)
    console.log(this.robotData);
    this.showAskBtn = false;


  }


  yesOrNoButtonEvent(option) {
    var rplyMessage;
    var childMessage;
    this.askQuestion = option;
    if (option == 'Yes') {
      this.askbalance = true;
      this.robotData[this.lastIndex]["showBtn"] = false;
      this.askquestionbtn = false;
      rplyMessage = "Sure!";
    } else {
      this.askquestionbtn = true;
      this.robotData[this.lastIndex]["showBtn"] = false;
      rplyMessage = "Thank You for using our Chat box,see you soon! ";
    }
    this.robotData[this.lastIndex]["UserResponse"].push({ "umessage": this.askQuestion });
    this.robotData.push({
      "Message": rplyMessage,
      "ChildMessage": [

      ],
      "UserResponse": [

      ],
      "showBtn": this.showAskBtn

    });

    this.lastIndex = this.robotData.length - 1;
    console.log(this.lastIndex)
    console.log(this.robotData);
    this.showAskBtn = false;
  }



  transfermoney(option) {
    var rplyMessage = "You are transfering  money to " + option;
    var childMessage = "Thank You for using our Chat box,see you soon! "
    this.robotData[this.lastIndex]["UserResponse"].push({ "umessage": option });
    this.showAskBtn = false;
    this.askbalance = false;
    this.askquestionbtn = true;
    this.robotData.push({
      "Message": rplyMessage,
      "ChildMessage": [
        { "cmessage": childMessage }
      ],
      "UserResponse": [

      ],
      "showBtn": false

    });
    this.lastIndex = this.robotData.length - 1;
    console.log(this.lastIndex)
    console.log(this.robotData);

  }


}
