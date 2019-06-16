const express = require('express');
const router = express.Router();
const trains = require('../model/trains');

router.get('/train', AllTrainList); //전체 지하철역 출력
router.get('/train/:lineNum', SerchTrainLine);
router.post('/train',AddNewStation);
router.delete('/train/:stationcd', DeleteStation);
router.put('/train',UpdateStation);


module.exports = router;

// 전체 라인의 역 출력
function AllTrainList(req, res) {
	const trainList = trains.GetTrainList();
	const result = { data:trainList, count:trainList.length };
	res.send(result);
}

// get으로 1~9 사용시 해당 라인에있는 역 출력
async function SerchTrainLine(req, res) {
    try {
        
        const lineNum = req.params.lineNum;
        console.log('lineNum : ', lineNum);
        const info = await trains.SerchTrain(lineNum);
        res.send(info);
    }
    catch ( error ) {
        console.log('Can not find, 404');
        res.status(error.code).send({msg:error.msg});
    }
}
//{"line_num":"1","station_cd":"1723","station_nm":"지제","fr_code":"P164"},

async function AddNewStation(req, res) {

	const line_num = req.body.line_num;
	const station_cd = req.body.station_cd;
	const station_nm = req.body.station_nm;
	const fr_code = req.body.fr_code;

	if (!line_num || !station_cd || !station_nm || !fr_code)
	{
		res.status(400).send({erroe:'누락 확인 필요'});
		return;
	}

	try
	{
		console.log('Try start');
		const result = await trains.AddNewStation(line_num, station_cd, station_nm, fr_code);
		res.send({msg:'Line Add Success!!', data: result});
	}
	catch (error)
	{
		res.status(500).send(error.msg);
	}
}

async function DeleteStation(req, res) {
	try
	{
		const station_cd = req.params.stationcd;
		
		const result = await trains.DeleteStation(station_cd);
		res.send({msg: 'DeleteStation success'});
	}
	catch (error)
	{
		console.log('Delete False');
		res.status(error.code).send({msg:error.msg});
	}
}

async function UpdateStation(req, res) {
	const lineNum	= req.body.line_num;
	const stationCd = req.body.station_cd;
	const stationNm = req.body.station_nm;
	const frCode	= req.body.fr_code;

	console.log(lineNum	);
	console.log(stationCd );
	console.log(stationNm );
	console.log(frCode	);
	try
	{
		const result = await trains.UpdateStation(lineNum, stationCd, stationNm, frCode);

		res.send({msg: 'UpdateStation success', data:result});
	}		
	catch (error)
	{		
		console.log('Update False');
		res.status(error.code).send({msg:error.msg});
	}
}