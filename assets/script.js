const bmiForm = document.getElementById('bmiForm');
const caloriForm = document.getElementById('caloriForm');
const heartRateForm = document.getElementById('heartRateForm');

const resultBMI = document.getElementById('resultBMI');
const resultCalori = document.getElementById('resultCalori');
const resultHeartRate = document.getElementById('resultHeartRate');

function bmi(data) {  
    const tinggi_badan = data.tinggi_badan/100;
    const berat_badan = data.berat_badan;

    const bmi = Math.round(berat_badan/(tinggi_badan*tinggi_badan));

    let result = '';

    if(bmi < 18.5){
        result = 'kurang';
    }else if(bmi >= 18.5 && bmi <= 24.9){
        result = 'normal';
    }else if(bmi >= 25 && bmi <= 29.9){
        result = 'berlebih';
    }else if(bmi >= 30){
        result = 'obesitas';
    }

    resultBMI.innerHTML = `<p>hasil BMI anda: ${bmi}, <br>maka anda tergolong berat badan ${result}</p>`
}

function calori(data) {  
    const jenis_kelamin = data.jenis_kelamin;
    const umur = data.umur;
    const tinggi_badan = data.tinggi_badan;
    const berat_badan = data.berat_badan;
    const aktifitas = data.aktifitas;
    let calori,nominal_aktifitas;

    switch (jenis_kelamin) {
        case 'l':
            calori = (88.4 + 13.4 * berat_badan) + (4.8 * tinggi_badan) - (5.68 * umur);
            break;
        case 'p':
            calori = (447.6 + 9.25 * berat_badan) + (3.10 * tinggi_badan) - (4.33 * umur);
            break;
    
        default:
            break;
    }

    if(aktifitas === 'kurang_aktif'){
        nominal_aktifitas = 1.2;
    }if(aktifitas === 'aktif_ringan'){
        nominal_aktifitas = 1.375;
    }if(aktifitas === 'cukup_aktif'){
        nominal_aktifitas = 1.55;
    }if(aktifitas === 'sangat_aktif'){
        nominal_aktifitas = 1.725;
    }if(aktifitas === 'aktif_aktif'){
        nominal_aktifitas = 1.9;
    }

    calori = Math.round(calori*nominal_aktifitas);
    resultCalori.innerHTML = `<p>
        kalori normal harian = ${calori},<br>
        kalori normal hariann cutting untuk diet = ${calori-500}
    </p>`;

}

function heartRate(data) {  
    const umur = data.umur;

    const maxHR = Math.round(220-umur);
    const fatburnMin = Math.round(maxHR*0.60);
    const fatburnMax = Math.round(maxHR*0.70);

    resultHeartRate.innerHTML = `<p>hasilnya dari maksimal heartrate anda ${maxHR} Bpm Fat burn zone anda harus berada pada ${ fatburnMin } -  ${fatburnMax} Bpm</p>`
}

bmiForm.addEventListener('submit',function(e){
    e.preventDefault();
    const tinggi_badan = this.querySelector('#tinggi_badan').value;
    const berat_badan = this.querySelector('#berat_badan').value;
    const data = {
        tinggi_badan: Number(tinggi_badan),
        berat_badan: Number(berat_badan)
    };
    bmi(data);
})

caloriForm.addEventListener('submit',function(e){
    e.preventDefault();
    const jenis_kelamin = this.querySelector('#jenis_kelamin').value;
    const umur = this.querySelector('#umur').value;
    const tinggi_badan = this.querySelector('#tinggi_badan').value;
    const berat_badan = this.querySelector('#berat_badan').value;
    const aktifitas = this.querySelector('#aktifitas').value;
    const data = {
        jenis_kelamin: jenis_kelamin,
        umur: Number(umur),
        tinggi_badan: Number(tinggi_badan),
        berat_badan: Number(berat_badan),
        aktifitas: aktifitas
    };
    calori(data);
})

heartRateForm.addEventListener('submit',function(e){
    e.preventDefault();
    const umur = this.querySelector('#umur').value;
    const data = {
        umur: Number(umur),
    };
    heartRate(data);
})