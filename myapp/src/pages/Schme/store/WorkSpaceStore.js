import { observable, action, runInAction } from 'mobx';
import { toJS } from 'mobx';

class  WorkSpaceStore{
  @observable columnData = [
    
  ];

  @action
  addColumn (object1) {
    
    this.columnData.push(object1);
  }

  @action
  addSupplier(groupIndex){
    const columns = toJS(this.columnData);
    let columnIndex = -1;
    for(let i= 0; i<columns.length;i++){
      if(groupIndex === columns[i].index){
        columnIndex = i;
        break;
      }
    }

    const index= groupIndex + '-'+(columns[columnIndex].children.length+1);
    const title = '供应商'+ (index);
    const supplier = {title:title,index:index};
    
    


    columns[columnIndex].children.push(supplier);
    this.columnData = columns;
  }

  @action
  moveGroup(groupIndex,move){
    const columns = toJS(this.columnData);
    let columnIndex = -1;
    for(let i= 0; i<columns.length;i++){
      if(groupIndex === columns[i].index){
        columnIndex = i;
        break;
      }
    }
    
    if(move === -1 && columnIndex+1 === 1){
      return;
    }
    if(move === 1 && columns.length === columnIndex+1){
      return;
    }
    const t = columns[columnIndex+move];
    columns[columnIndex+move] = columns[columnIndex];
    columns[columnIndex] = t;
    this.columnData = columns;
  }

  @action
  moveScheme(index,move){
    const columns = toJS(this.columnData);
    const list = index.split('-');
    const groupIndex= list[0];
    const schemeIndex = list[1];
    let columnIndex= -1;
    let columnSchemeIndex = -1;
    for(let i= 0; i<columns.length;i++){
      if(groupIndex === columns[i].index+''){
        columnIndex = i;
        const children = columns[i].children;
        for(let j = 0;j<children.length;j++){
          if(children[j].index.split('-')[1]+'' === schemeIndex+''){
            columnSchemeIndex = j;
            break;
          }
        }
      }
    }

    const schemeColums = columns[columnIndex].children;
    if(move === -1 && columnSchemeIndex+1 === 1){
      return;
    }
    if(move === 1 && columnSchemeIndex +1 === schemeColums.length ){
      return;
    }

    const t = schemeColums[columnSchemeIndex+move];
    schemeColums[columnSchemeIndex+move] = schemeColums[columnSchemeIndex];
    schemeColums[columnSchemeIndex] = t;
    columns[columnIndex].children = schemeColums;
    console.log(columns);
    this.columnData = columns;
  }
}

export default WorkSpaceStore;