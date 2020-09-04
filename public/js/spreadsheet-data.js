var spData = null;
function doData(json) {
  // console.log(json)
  spData = json.feed.entry;
}

function drawCell(tr, val) {
  var td = $("<td class='data-symbol' />");
  tr.append(td);
  td.append(val);
  return td;
}
function drawRow(table, rowData) {
  if (rowData == null) return null;
  if (rowData.length == 0) return null;
  var tr = $("<tr/>");
  table.append(tr);
  // console.log(rowData)
  for(var c=0; c<rowData.length; c++) {
    drawCell(tr, rowData[c]);
  }
  return tr;
}

function drawTable(parent) {
  var table = $("<table class='table table-hover' />");
  parent.append(table);
  return table;
}

function readData(parent, tabPosition) {
  var data = spData;
  var table = drawTable(parent);
  var rowData = [];
  var rowTopData = [];

  let array = [2,3,7,8];
  if (tabPosition > 5) {
    array = [2,3,8,9];
  }
  
  for(var r=0; r<data.length; r++) {
    var cell = data[r]["gs$cell"];
    
    var val = cell["$t"];
    
    if (cell.col == 1) {
        drawRow(table, rowData);
        drawRow(table, rowTopData);
        rowData = [];
        rowTopData = [];
    }


    const value = cell.col;
    const checkInArr = array.includes(parseInt(value) );

    if ( checkInArr ) {
      rowData.push(val);

    }
  }
  drawRow(table, rowData);
}

function pushData(position, id) {
  let urlCallback = "https://spreadsheets.google.com/feeds/cells/1kxdxtEBTGwtAiOqCIociDM9T_ZWMRSuGvDVtCzkqrTc/" +position+ "/public/values?alt=json-in-script&callback=doData"
  jQuery.getScript(urlCallback, function() {
    readData($(id), position);
  })
} 
$(document).ready(function(){
  var tabsLength = 9;
  var tabs = {
    dataForex: [1, "#dataForex"],
    dataSpotMetals: [2, "#dataSpotMetals"],
    dataIndices: [3, "#dataIndices"],
    dataSpotCommodities: [4, "#dataSpotCommodities"],
    dataCryptoCurrencies: [5, "#dataCryptoCurrencies"],
    dataSharesUSA: [6, "#dataSharesUSA"],
    dataSharesEU: [7, "#dataSharesEU"],
    dataSharesRusia: [8, "#dataSharesRusia"],
    dataSharesAsia: [9, "#dataSharesAsia"],
  }
  
  $.each(tabs, function(key, value) {
    // console.log(key, value);
    pushData(value[0], value[1])
  });
  
}); 