let vozaci = [
    {ime:"Max Verstappen", tim:"Red Bull", brzina:97, veshtina:99, gumi:"меки", pitstop:false, status:"Старт"},
    {ime:"Lewis Hamilton", tim:"Mercedes", brzina:95, veshtina:97, gumi:"тврди", pitstop:false, status:"Старт"},
    {ime:"Charles Leclerc", tim:"Ferrari", brzina:96, veshtina:95, gumi:"меки", pitstop:false, status:"Старт"},
    {ime:"Lando Norris", tim:"McLaren", brzina:96, veshtina:96, gumi:"тврди", pitstop:false, status:"Старт"},
    {ime:"Fernando Alonso", tim:"Aston Martin", brzina:93, veshtina:98, gumi:"тврди", pitstop:false, status:"Старт"},
    {ime:"Carlos Sainz", tim:"Williams", brzina:94, veshtina:94, gumi:"меки", pitstop:false, status:"Старт"},
    {ime:"Pierre Gasly", tim:"Alpine", brzina:91, veshtina:90, gumi:"меки", pitstop:false, status:"Старт"},
    {ime:"Alexander Albon", tim:"Williams", brzina:92, veshtina:93, gumi:"меки", pitstop:false, status:"Старт"},
    {ime:"Isack Hadjar", tim:"RB", brzina:89, veshtina:88, gumi:"тврди", pitstop:false, status:"Старт"},
    {ime:"Oscar Piastri", tim:"McLaren", brzina:95, veshtina:93, gumi:"меки", pitstop:false, status:"Старт"}
];

function start()
{
    for (let i = 0; i < vozaci.length; i++) {
        vozaci[i].vreme = 0;
        vozaci[i].vkupno = 0;
        vozaci[i].pitstop = false;
        vozaci[i].status = "Старт";
    }
    let Sleden = document.getElementById("SledenKrug");
    let Nova = document.getElementById("NovaTrka");
    Sleden.addEventListener("click", SledenKrug, false);
    Nova.addEventListener("click", NovaTrka, false);

    PrintVozaci(vozaci, document.getElementById("tabela"));
}

let krug = 0;

function PrintVozaci(niza, printt)
{
    let sodrzina = "<h2>Круг: " + krug + " / 10</h2><table>" +
        "<thead><th>#</th><th>Возач</th><th>Тим</th><th>Брзина</th>" +
        "<th>Вештина</th><th>Гуми</th><th>Време (круг)</th><th>Вкупно</th><th>Статус</th></thead><tbody>";

    let dolzina = niza.length;

    for (let i = 0; i < dolzina; ++i)
    {
        sodrzina += "<tr><td>" + (i + 1) + "</td><td>" + niza[i].ime +
            "</td><td>" + niza[i].tim +
            "</td><td>" + niza[i].brzina +
            "</td><td>" + niza[i].veshtina +
            "</td><td>" + niza[i].gumi + 
            "</td><td>" + niza[i].vreme.toFixed(3) + 
            "</td><td>" + niza[i].vkupno.toFixed(3) + 
            "</td><td><b>" + niza[i].status + "</b></td></tr>";
    }

    sodrzina = sodrzina + "</tbody></table>";
    printt.innerHTML = sodrzina;
}

function SledenKrug()
{
    if (krug >= 10) {
        alert("Трката е завршена! Победник е " + vozaci[0].ime);
        return;
    }

    ++krug;

    let safetyCarIzlezeno = Math.random() < 0.20;

    for (let i = 0; i < vozaci.length; i++) {
        let v = vozaci[i];
        let krugstatus = "Нормално возење";

        let krugvreme = 90 - v.brzina / 10 + Math.random() * 2 + Math.random() * (100 - v.veshtina) / 5;

        if (v.gumi === "меки") {
            krugvreme -= 1.;
        }

        if (safetyCarIzlezeno) {
            krugvreme += 8.;
            krugstatus = "Безбедносно возило";
        }

        if (!v.pitstop && (krug >= 5 || Math.random() < 0.35)) {
            v.pitstop = true;
            krugvreme += 15.; 
            if (v.gumi === "меки") {
                v.gumi = "тврди";
            } 
            else{
                v.gumi = "меки";
            }
            krugstatus = "Влезе во пит-стоп(Смени гуми)";
        } 
        else if (!safetyCarIzlezeno && Math.random() < 0.10) {
            krugvreme += 6.; 
            krugstatus = "Се изврте";
        }

        v.vreme = krugvreme;
        v.vkupno += v.vreme;
        v.status = krugstatus;
    }

    vozaci.sort((a, b) => a.vkupno - b.vkupno);
    PrintVozaci(vozaci, document.getElementById("tabela"));
    if (krug === 10) {
        alert("Трката е завршена! Победник е " + vozaci[0].ime);
    }
}

function NovaTrka()
{
    krug = 0;

    for (let i = 0; i < vozaci.length; i++) {
        vozaci[i].vreme = 0;
        vozaci[i].vkupno = 0;
        vozaci[i].pitstop = false;
        if (i % 2 === 0)
        {
            vozaci[i].gumi = "меки";
        } 
        else{
            vozaci[i].gumi = "тврди";
        }
        vozaci[i].status = "Старт";
    }

    let Sleden = document.getElementById("SledenKrug");
    if (Sleden) Sleden.disabled = false;
    
    PrintVozaci(vozaci, document.getElementById("tabela"));
}   

window.addEventListener("load", start, false);
