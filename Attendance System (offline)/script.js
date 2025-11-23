// script.js (same logic — stable)
(function(){
const STORAGE_KEY = 'att_sys_v2';
const studentName = document.getElementById('studentName');
const markBtn = document.getElementById('markBtn');
const attTableBody = document.querySelector('#attTable tbody');
const totalSpan = document.getElementById('total');
const presentSpan = document.getElementById('present');
const exportCsvBtn = document.getElementById('exportCsv');
const clearAllBtn = document.getElementById('clearAll');


let records = [];


function nowFormatted(){ return new Date().toLocaleString(); }
function save(){ localStorage.setItem(STORAGE_KEY, JSON.stringify(records)); }
function load(){ records = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'); }


function render(){
attTableBody.innerHTML = '';
records.forEach((r,i)=>{
attTableBody.innerHTML += `
<tr>
<td>${i+1}</td>
<td>${r.name}</td>
<td>${r.time}</td>
<td><button class="remove" data-i="${i}">X</button></td>
</tr>`;
});
totalSpan.textContent = records.length;
presentSpan.textContent = records.length;
}


markBtn.addEventListener('click', ()=>{
const name = studentName.value.trim();
if(!name) return alert("Enter name");
records.push({name, time: nowFormatted()});
save(); render(); studentName.value='';
});


attTableBody.addEventListener('click', e=>{
if(e.target.classList.contains('remove')){
const i = +e.target.dataset.i;
records.splice(i,1); save(); render();
}
});


exportCsvBtn.addEventListener('click', ()=>{
if(records.length===0) return alert('No data');
const header = 'No,Name,Time
';
const rows = records.map((r,i)=>`${i+1},${r.name},${r.time}`).join("
");
const blob = new Blob([header+rows], {type:'text/csv'});
const url = URL.createObjectURL(blob);
const a = document.createElement('a'); a.href = url; a.download='attendance.csv'; a.click();
});


clearAllBtn.addEventListener('click', ()=>{
if(confirm('Reset all?')){ records=[]; save(); render(); }
});


load(); render();
})();