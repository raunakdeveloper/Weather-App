import WeatherSearch from "../models/WeatherSearch.js";

export const addSearchTag = async (req, res) => {
  try {
    const { searchTag } = req.body;
    const newSearch = new WeatherSearch({
      user: req.user._id,
      searchTag: searchTag.toLowerCase(),
    });
    await newSearch.save();
    res.status(201).json(newSearch);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error adding search tag", error: error.message });
  }
};

export const getSearchHistory = async (req, res) => {
  try {
    const history = await WeatherSearch.find({ user: req.user._id }).sort({
      createdAt: -1,
    });
    res.json(history);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching search history", error: error.message });
  }
};

export const deleteSearchTag = async (req, res) => {
  try {
    const { id } = req.params;
    await WeatherSearch.findOneAndDelete({ _id: id, user: req.user._id });
    res.json({ message: "Search tag deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting search tag", error: error.message });
  }
};
