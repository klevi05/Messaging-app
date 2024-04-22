export default function findIp(args){
  fetch('https://api.ipify.org?format=json')
  .then(response => response.json())
  .then(data => {
      args(String(data.ip)) 
  })
}
