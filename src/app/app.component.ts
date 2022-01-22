import { Component, Renderer2 } from '@angular/core';
import {KeyValue} from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'displayFrontEnd';
  tabList:any = []
  tabIdDict: any = {}
  groupNameDict: any = {}
  varNameDict: any = {}
  newGroupDict: any ={}
  Object = Object;

  constructor(private renderer: Renderer2){
    this.tabListFunction();
    this.tabContentDisplayFunction();
  }

  openCity(event: any, tabId:any){
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
    // tabcontent[i].style.display = "none";
    this.renderer.setStyle(tabcontent[i], 'display', 'none');
  }
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  this.renderer.setStyle(document.getElementById(tabId), 'display', 'block');
  event.currentTarget.className += " active";
  }


  tabListFunction(){
    fetch('../assets/MPM10UI.xml').then((response) => {
      response.text().then((xml) => {
        const parser = new DOMParser().parseFromString(xml, "text/xml");
        var vars = parser.getElementsByTagName("tab");
        var count = 0;
        for(var i = 0; i < vars.length; i++){
          
          let tabTag = {
            tabName : vars[i].getAttribute("name"),
            tabId : "tabId"+count
          }
            this.tabList.push(tabTag)
            count++;
        }
      });
    });
  }


  tabContentDisplayFunction(){
    fetch('../assets/MPM10UI.xml').then((response) => {
      response.text().then((xml) => {
        const parser = new DOMParser().parseFromString(xml, "text/xml");
        var tabId = parser.getElementsByTagName("tab");
        var count = 0;
        for(var i = 0; i < tabId.length; i++){
          this.groupNameDict = {}
          for(var j = 0; j < tabId[i].children.length; j++){
            this.varNameDict = {}
            for(var k = 0; k < tabId[i].children[j].children.length; k++){
              var text=tabId[i].children[j].children[k].getAttribute("name")
              var result;
              if(text != null){
                result = text.substring(8);
              }
              this.varNameDict[String(result)] = null
            }
            this.groupNameDict[String(tabId[i].children[j].getAttribute("name"))] = this.varNameDict
          }
          this.tabIdDict[String("tabId"+count++)] = this.groupNameDict
        }
        console.log(this.tabIdDict)
      });
    });
  }

  isHtmlPrintable(value:any){
    return value === "" || typeof value === "string" || typeof value === "number";
  }

}

