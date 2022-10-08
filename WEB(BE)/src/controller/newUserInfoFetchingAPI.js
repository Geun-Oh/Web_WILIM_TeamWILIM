import User from '../models/user';
import GoalElement from '../models/goalElement';
import axios from 'axios';
import "../env.js";
import mongoose from 'mongoose';
import { db_cstring , session_secret , kakao_key , qnet_key} from "../db.js";
//getCtfInfo, postNewCtfInfo, updateCtfInfo, deleteCtfInfo, getUserGoal, postNewUserGoal, deleteUserGoal

//GET certificate Info from goalElement
module.exports.getCtfInfo = async(req,res,next)=>{
    const {id} = req.params;
    const ctf = await GoalElement.findById(id);
    res.send(ctf);
}