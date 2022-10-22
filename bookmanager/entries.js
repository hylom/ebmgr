
module.exports.entriesMixinBuilder = Base => class extends Base {
  async getEntry(vpath) {
    await this.db.open();
    const entry = this.db.getEntry(vpath);
    await this.db.close();
    return entry;
  }
  
  async setEntry(vpath, entry) {
    await this.db.open();
    await this.db.setEntry(vpath, entry);
    await this.db.commit();
    await this.db.close();
  }

  async setStar(vpath, state) {
    if (!vpath) {
      throw new InvalidPathError();
    }
    const entry = await this.getEntry(vpath);
    if (state) {
      entry.starred = true;
    } else {
      delete entry.starred;
    }
    return this.setEntry(vpath, entry);
  }
};
