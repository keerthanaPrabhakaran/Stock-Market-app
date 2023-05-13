var symbol = '';
  
document.getElementById("myBtn").addEventListener("click", CallAPI);
  

function CallAPI(){
	symbol = document.getElementById("name").value;
	symbol = symbol.toUpperCase();
	companyRealStockPrice();
	getRequest(
	'https://www.financialmodelingprep.com/api/v3/historical-chart/15min/' + symbol + "?apikey=4ad251cf162323d71a13235961f16528",
	drawOutput);
}

function companyRealStockPrice(){
	getRequest(
	'https://www.financialmodelingprep.com/api/v3/quote-short/' + symbol + "?apikey=4ad251cf162323d71a13235961f16528",
	drawOutputRealPrice);	
}
	
function drawOutputRealPrice(responseText) {	

	let resp = JSON.parse(responseText); 
	if(resp.length==0){
		alert("The Stock Code For Company Is Incorrect!! Check once again properly!");
		document.getElementById("CompanyName").innerHTML="";
	    document.getElementById("StockPrice").innerHTML="";
		document.getElementById("name").value="";
		
	}else{
		document.getElementById("CompanyName").innerHTML="<h3>Company Name:</h3>" + resp[0].symbol;
		document.getElementById("StockPrice").innerHTML="<h3>Stock Price:</h3> $ " + resp[0].price;	
	}
}
	
	 
function drawOutput(responseText) {
   
	let $tables = document.getElementById("tableStock");
	document.body.removeChild($tables);
    let resp = JSON.parse(responseText);

    let $table = document.createElement("table");
    $table.className += " table";
	$table.id += "tableStock";
	
    var elements = document.querySelectorAll('.stock-name')[0];

    let $head = document.createElement("thead");
    let $body = document.createElement("tbody");

    let $lineHader = document.createElement("tr");

    for (let i = 0; i < resp.length; i++) {
       let financial = resp[i];
       let $line = document.createElement("tr");
       for (var key in financial) {	   
         if (i === 0 && financial.hasOwnProperty(key)) {
           let $ele = document.createElement("th");
           $ele.textContent = key.toUpperCase();
           $lineHader.appendChild($ele);
         }
       }
       $head.appendChild($lineHader);
       $table.appendChild($head);
       for (var key2 in financial) {
         if (financial.hasOwnProperty(key2)) {
           let $eletd = document.createElement("td");
           $eletd.textContent = financial[key2];
           $line.appendChild($eletd);
         }
       }
       $body.appendChild($line)
       $table.appendChild($body);
    }
     
	document.body.appendChild($table); 
}

function getRequest(url, success) {
     var req = false;
     try {
       req = new XMLHttpRequest();
     } catch (e) {
       try {
         req = new ActiveXObject("Msxml2.XMLHTTP");
       } catch (e) {
         try {
           req = new ActiveXObject("Microsoft.XMLHTTP");
         } catch (e) {
           return false;
         }
       }
     }
     if (!req) return false;
     if (typeof success != 'function') success = function() {};
     req.onreadystatechange = function() {
       if (req.readyState == 4) {
         if (req.status === 200) {
           success(req.responseText)
		 }
       }
     }
     req.open("GET", url, true);
     req.send(null);
     return req;
} 

	
	
	
	
	
