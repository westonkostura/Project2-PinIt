const { Map, Marker, User } = require("../../models");
const { route } = require("./Marker-routes");
const router = require("express").Router();

router.get('/', async (req, res) => {
  try {
    const Mapdata = await Map.findAll({
      include: [{ model: Marker, through: User }],
    });
    if (!Mapdata) {
      res.status(404).json({ message: "no map found with this id!" });
    }
    res.status(200).json(Mapdata);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Create a new map
router.post('/maps', async (req, res) => {
  const { mapname, markerdata } = req.body;

  try {
    const newMap = await Map.create({
      mapname: mapname,
      markerdata: markerdata,
    });

    res.json(newMap);
  } catch (err) {
    console.log(err);
    res.status(500).send('Error saving map to database');
  }
});

module.exports = router;