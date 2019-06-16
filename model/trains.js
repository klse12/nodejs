const fs = require('fs');

class Train{
	
	constructor() {
		//data.json 파일 read
		const data = fs.readFileSync('./model/data.json');
		//read한 json 파싱
		this.data = JSON.parse(data);
	}

	GetTrainList() {
		if(this.data) {
			var dd = this.data.DATA[0].line_num
			console.log('num :',dd);
			return this.data.DATA;
		}
		else {
			return [];
		}
	}

//검색
	SerchTrain(linenum) {
		return new Promise((resolve, reject) => {
			var tt = this.data.DATA.filter(function(object){
				if (object.line_num == linenum)
				{
					return object;
				}
			});		
			resolve(tt);
			return;

		});
		reject({msg:'Can not find line', code:404});
	}

//추가
	AddNewStation(line_num, station_cd, station_nm, fr_code){
		console.log('AddNewStation start');
		return new Promise((resolve, reject) => {
			let addNewStation = {line_num:line_num, station_cd:station_cd, station_nm:station_nm, fr_code:fr_code};
			console.log('new object : ',addNewStation);
			//data.DATA array에 push해야함
			this.data.DATA.push(addNewStation);

			resolve(addNewStation);
		});
	}

//삭제
	DeleteStation(station_cd){
		console.log('DeleteStation start', station_cd);
		var i = 0;
		return new Promise((resolve, reject) => {
			for (var serchTarget of this.data.DATA)
			{
				if (serchTarget.station_cd == station_cd)
				{
					console.log('Serch success code :' ,station_cd);
					this.data.DATA.splice(Number(i), 1);
					resolve(serchTarget);
					return;
				}
				
				i++;
			}
			reject({msg:'Not find Station', code:404});
		});
	}
//수정
	UpdateStation(lineNum, station_cd, stationNm, frCode)
	{
		console.log('Update start', station_cd);
		return new Promise((resolve, reject) => {
			for (var serchTarget of this.data.DATA)
			{
				if (serchTarget.station_cd == station_cd)
				{
					console.log('Serch success code :' ,station_cd);
					if (lineNum) serchTarget.line_num		= lineNum;
					if (station_cd) serchTarget.station_cd	= station_cd;
					if (stationNm) serchTarget.station_nm	= stationNm;
					if (frCode) serchTarget.fr_code			= frCode;
					resolve(serchTarget);
					return;
				}
			}
			reject({msg:'Not find Station', code:404});
		});
	}

}

module.exports = new Train();