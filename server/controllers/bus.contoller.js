import { Bus } from "../models/bus.model.js";

export const addBus = async (req, res) => {
  try {
    const { busNumber, routeId } = req.body;
    if (!busNumber || !routeId) {
      return res.status(400).json({
        message: "Bus number and route ID are required",
        success: false,
      });
    }
    const newBus = new Bus({
      busNumber,
      route: routeId,
      active: false,
      location: {
        lat: 0,
        lng: 0,
      },
    });

    return res.status(201).json({
      message: "Bus created successfully",
      success: true,
      bus: await newBus.save(),
    });
  } catch (error) {
    console.error("Error creating bus:", error);
    res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};
export const getBuses = async (req, res) => {
  try {
    const buses = await Bus.find()
      .populate("driver", "name email")
      .populate("route", "routeName stops");
    if (!buses || buses.length === 0) {
      return res.status(404).json({
        message: "No buses found",
        success: false,
      });
    }
    return res.status(200).json({
      message: "Buses fetched successfully",
      success: true,
      buses,
    });
  } catch (error) {
    console.log("Error fetching buses:", error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

export const getBusById = async (req, res) => {
  try {
    const bus = await Bus.findById(req.params.id)
      .populate("driver", "name email")
      .populate("route", "routeName stops");

    if (!bus) {
      return res.status(404).json({
        message: "Bus not found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Bus fetched successfully",
      success: true,
      bus,
    });
  } catch (error) {
    console.log("Error fetching bus by ID:", error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

export const updateBusLocation = async (req, res) => {
    try {
        const { busId, lat, lng } = req.body;
      const bus = await Bus.findByIdAndUpdate(
        busId,
        {isactive: true},
        {
            location: 
            { lat, lng }
        }, { new: true });
        if (!bus) {
            return res.status(404).json({
                message: "Bus not found",
                success: false,
            });
        }
        return res.status(200).json({
            message: "Bus location updated successfully",
            success: true,
            bus,
        }); 
    } catch (error) {
        console.error("Error updating bus location:", error);
        return res.status(500).json({
            message: "Internal server error",
            success: false,
        });
        
    }
}

export const assignDriverToBus = async (req, res) => {
    try {
        const { busId, driverId } = req.body;

        const driver = await User.findById(driverId);
        if (!driver || driver.role !== 'driver') {
            return res.status(400).json({
                message: "Invalid driver ID or driver is not a driver",
                success: false,
            });
        }
        const bus = await Bus.findByIdAndUpdate(
            busId,
            { driver: driverId },
            { new: true }
        );
        if (!bus) {
            return res.status(404).json({
                message: "Bus not found",
                success: false,
            });
        }
        return res.status(200).json({
            message: "Driver assigned to bus successfully",
            success: true,
            bus,
        });


    } catch (error) {
        console.error("Error assigning driver to bus:", error);
        return res.status(500).json({
            message: "Internal server error",
            success: false,
        });
        
    }
}

export const deactivateBus = async (req, res) => {
  try {
    const { busId } = req.params.id;
    const bus = await Bus.findByIdAndUpdate(
      busId,
      { active: false },
      { new: true }
    );
    if (!bus) {
      return res.status(404).json({
        message: "Bus not found",
        success: false,
      });
    }
    return res.status(200).json({
      message: "Bus deactivated successfully",
      success: true,
      bus,
    });
  } catch (error) {
    console.error("Error deactivating bus:", error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};