class Home {
  async index(req, res) {
    res.json('Hello world!');
  }
}

export default new Home();
