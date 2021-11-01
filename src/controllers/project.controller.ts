import { Request, Response } from 'express';
import Project from '../models/Project';

export const create = async (req: Request, res: Response) => {
    try {
        let { user, type, name, date_delivery } = req.body;
    
        let newProject = new Project({
            user,
            type: type,
            name,
            date_delivery
        });
    
        let responSave = await newProject.save();
        res.status(201).json(responSave);

    } catch(err) {
        res.status(401).json(err);
    }

}

export const getAll = async(req: Request, res: Response) => {
    try {
       let allProjects = await Project.find({}) ;
       res.status(200).json(allProjects);
       
    } catch(err) {
        res.status(401).json(err);

    }
}