import {User} from '../models/user.model.js';
import { Bus } from '../models/bus.model.js';
import { Route } from '../models/route.model.js';

const addRoute = async (req, res) => {
    try {
        const { routeName, stops } = req.body;
        if (!routeName || !stops || stops.length === 0) {
            return res.status(400).json({
                message: "Route name and stops are required",
                success: false,
            });
        }
        const newRoute = new Route({
            routeName,
            stops: stops.map((stop, index) => ({
                stopId: stop.stopId,
                stopName: stop.stopName,
                location: {
                    lat: stop.location.lat,
                    lng: stop.location.lng,
                },
                sequence: index + 1, // Assuming sequence is based on the order of stops
                scheduledTime: stop.scheduledTime,
            })),
        });
        const savedRoute = await newRoute.save();
        return res.status(201).json({
            message: "Route added successfully",
            success: true,
            route: savedRoute,
        });
    } catch (error) {
        console.error("Error adding route:", error);
        res.status(500).json({
            message: "Internal server error",
            success: false,
        });
        
    }
}

export const getRoutes = async (req, res) => {
    try {
        const routes = await Route.find()
        .populate('stops.stopId', 'stopName location');

        if (!routes || routes.length === 0) {
            return res.status(404).json({
                message: "No routes found",
                success: false,
            });
        }
        return res.status(200).json({
            message: "Routes fetched successfully",
            success: true,
            routes,
        });
    } catch (error) {
        console.error("Error fetching routes:", error);
        return res.status(500).json({
            message: "Internal server error",
            success: false,
        });
    }
}

export const getRouteById = async (req, res) => {
    try {
        const route = await Route.findById(req.params.id)
            .populate('stops.stopId', 'stopName location');

        if (!route) {
            return res.status(404).json({
                message: "Route not found",
                success: false,
            });
        }
        return res.status(200).json({
            message: "Route fetched successfully",
            success: true,
            route,
        });
    } catch (error) {
        console.error("Error fetching route:", error);
        return res.status(500).json({
            message: "Internal server error",
            success: false,
        });
    }
}

export const updateRoute = async (req, res) => {
    try {
        const { routeName, stops } = req.body;
        if (!routeName || !stops || stops.length === 0) {
            return res.status(400).json({
                message: "Route name and stops are required",
                success: false,
            });
        }
        const updatedRoute = await Route.findByIdAndUpdate(
            req.params.id,
            {
                routeName,
                stops: stops.map((stop, index) => ({
                    stopId: stop.stopId,
                    stopName: stop.stopName,
                    location: {
                        lat: stop.location.lat,
                        lng: stop.location.lng,
                    },
                    sequence: index + 1,
                    scheduledTime: stop.scheduledTime,
                })),
            },
            { new: true }
        );
        if (!updatedRoute) {
            return res.status(404).json({
                message: "Route not found",
                success: false,
            });
        }
        return res.status(200).json({
            message: "Route updated successfully",
            success: true,
            route: updatedRoute,
        });
    } catch (error) {
        console.error("Error updating route:", error);
        return res.status(500).json({
            message: "Internal server error",
            success: false,
        });
    }
}

export const deleteRoute = async (req, res) => {
    try {
        const deletedRoute = await Route.findByIdAndDelete(req.params.id);
        if (!deletedRoute) {
            return res.status(404).json({
                message: "Route not found",
                success: false,
            });
        }
        return res.status(200).json({
            message: "Route deleted successfully",
            success: true,
        });
    } catch (error) {
        console.error("Error deleting route:", error);
        return res.status(500).json({
            message: "Internal server error",
            success: false,
        });
    }
}