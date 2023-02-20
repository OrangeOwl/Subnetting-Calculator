// Objects to house each possible subnet mask, wildcard mask and usable bits for host addressing

// The subnet mask determines how much of the subnet is reserved for the Network and how much is usable by the hosts
// The wildcard mask is the remaining bits left out of the subnet mask. So if the equivalent subnet mask and wildcard mask were to be combined they would always equal 255.255.255.255 or if converted to binary: 11111111.11111111.11111111.11111111

const sm = { // CIDR notation key matched with value pairs of subnet mask, wildcard mask and usable bits of host addressing to calculate usable hosts
  32:["255.255.255.255", "0.0.0.0", "0"],
  31:["255.255.255.254", "0.0.0.1", "1"],
  30:["255.255.255.252", "0.0.0.3", "2"],
  29:["255.255.255.248", "0.0.0.7", "3"],
  28:["255.255.255.240", "0.0.0.15", "4"],
  27:["255.255.255.224", "0.0.0.31", "5"],
  26:["255.255.255.192", "0.0.0.63", "6"],
  25:["255.255.255.128", "0.0.0.127", "7"],
  24:["255.255.255.0", "0.0.0.255", "8"],
  23:["255.255.254.0", "0.0.1.255", "9"],
  22:["255.255.252.0", "0.0.3.255", "10"],
  21:["255.255.248.0", "0.0.7.255", "11"],
  20:["255.255.240.0", "0.0.15.255", "12"],
  19:["255.255.224.0", "0.0.31.255", "13"],
  18:["255.255.192.0", "0.0.63.255", "14"],
  17:["255.255.128.0", "0.0.127.255", "15"],
  16:["255.255.0.0", "0.0.255.255", "16"],
  15:["255.254.0.0", "0.1.255.255", "17"],
  14:["255.252.0.0", "0.3.255.255", "18"],
  13:["255.248.0.0", "0.7.255.255", "19"],
  12:["255.240.0.0", "0.15.255.255", "20"],
  11:["255.224.0.0", "0.31.255.255", "21"],
  10:["255.192.0.0", "0.63.255.255", "22"],
  09:["255.128.0.0", "0.127.255.255", "23"],
  08:["255.0.0.0", "0.255.255.255", "24"],
  07:["254.0.0.0", "1.255.255.255", "25"],
  06:["252.0.0.0", "3.255.255.255", "26"],
  05:["248.0.0.0", "7.255.255.255", "27"],
  04:["240.0.0.0", "15.255.255.255", "28"],
  03:["224.0.0.0", "31.255.255.255", "29"],
  02:["192.0.0.0", "63.255.255.255", "30"],
  01:["128.0.0.0", "127.255.255.255", "31"],
}

function calcHosts(usableHostBits) {
  hosts = 2 ** Number(usableHostBits) - 2
  if (hosts == 0) {
    let hosts = "2 (if used in Point-to-Point Network)";
    return hosts
  } else if (hosts == -1) {
    let hosts = "1 (to be used in only specific circumstances, cannot be used to connect hosts)";
    return hosts
  } else {
    return hosts
  }
}

function subnetResults(ipArray, subnetMask) {
  var subnet = sm[Number(subnetMask)][0];
  var wildcard = sm[Number(subnetMask)][1];
  var usableHostBits = sm[Number(subnetMask)][2];
  var hosts = calcHosts(usableHostBits);
  console.log(subnet);
  var subnetTable = document.createElement('div');
  subnetTable.setAttribute('class', 'subnetTable');
  subnetTable.setAttribute('id', 'subnetTable'); // style it to the form div
  subnetTable.innerHTML = "<table>" + 
                          "<tr><th>Attribute</th><th>Value</th></tr>" + 
                          "<tr><td>IP Host</td><td>" + ipArray[0] + "." + ipArray[1] + "." + ipArray[2] + "." + ipArray[3] + "</td>" +
                          "<tr><td>Subnet Mask</td><td>" + subnet +"</td></tr>" +
                          "<tr><td>Wildcard Mask</td><td>" + wildcard +"</td></tr>" +
                          "<tr><td>Number of Usable Hosts</td><td>" + hosts +"</td></tr>" +  //future version to be setup to calculate gateway/network address and broadcast address
                          "</table>";
  document.body.appendChild(subnetTable); //append div to body
}

function parseData(ipOctet1, ipOctet2, ipOctet3, ipOctet4, subnetMask) {
  // create integer list from strings sumbitted
  let ipArray = [Number(ipOctet1), Number(ipOctet2), Number(ipOctet3), Number(ipOctet4)];
  for (i = 0; i < ipArray.length; i++){
    if (ipArray[i] < 256) {
      continue;
    } else {
      alert("invalid IP Address");
      location.reload();
      break;
    };
  };
  subnetResults(ipArray, subnetMask);
}

function init() {
    // grabbing the form element and adding an event listener to the submit button
    //var test document.getElementById("form");
    document.getElementById("ipform").addEventListener("submit", (e) => {
      e.preventDefault();
      // If network table already exists delete it
      try {
        let tablediv = document.getElementById("subnetTable");
        tablediv.parentNode.removeChild(tablediv);
      } catch(err) {
        console.log("no pre-existing table exists, continuinig");
      }
      // grabbing the values entered into the form (come back to this to see if I can avoid repeating myself)
      const ipOctet1 = document.getElementById("ip-address-1").value;
      const ipOctet2 = document.getElementById("ip-address-2").value;
      const ipOctet3 = document.getElementById("ip-address-3").value;
      const ipOctet4 = document.getElementById("ip-address-4").value;
      const subnetMask = document.getElementById("subnet-mask").value;
      // if the text boxes are empty we don't continue, otherwise grab the values and continue
      parseData(ipOctet1, ipOctet2, ipOctet3, ipOctet4, subnetMask);
    });
}

init()

