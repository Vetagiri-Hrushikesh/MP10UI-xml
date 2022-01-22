import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'displayFrontEnd';
  list: any = [];
  tabList:any = []
  groupDict: any = {}
  varlist : any = []
  varValues : any = {}

  constructor(){
    this.tabListFunction();
    this.groupVarFunction();
    console.log(this.tabList)
    console.log(this.list) 
  }


  groupVarFunction(){
    fetch('../assets/MPM10UI.xml').then((response) => {
      response.text().then((xml) => {
        const parser = new DOMParser().parseFromString(xml, "text/xml");
        var vars = parser.getElementsByTagName("tab");
        for(var i = 0; i < vars.length; i++){
          for(var j = 0; j < vars[i].children.length; j++){
            this.groupDict = {
                name: vars[i].children[j].getAttribute("name"),
                varDict: 2
            }
            this.varlist = [];
            this.varValues = {}
            for(var k = 0; k < vars[i].children[j].children.length; k++){
              var text=vars[i].children[j].children[k].getAttribute("name")
              var result;
              if(text != null){
                result = text.substring(8);
              }
              this.varValues[String(result)] = null
            }
              this.varlist.push(this.varValues)
            this.groupDict['varDict'] = this.varlist
            this.list.push(this.groupDict)
          }
        }
        // console.log(this.list)
      });
    });
  }

  tabListFunction(){
    fetch('../assets/MPM10UI.xml').then((response) => {
      response.text().then((xml) => {
        const parser = new DOMParser().parseFromString(xml, "text/xml");
        var vars = parser.getElementsByTagName("tab");
        for(var i = 0; i < vars.length; i++){
            this.tabList.push(vars[i].getAttribute("name"))
        }
        // console.log(this.tabList)
      });
    });
  }
}
