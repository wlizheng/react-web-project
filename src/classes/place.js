class Place {
   constructor(id, title, address, description, photos, price, checkIn, checkOut,
      maxGuests) {
      this.id = id;
      this.title = title;
      this.description = description;
      this.address = address;
      this.photos = photos;
      this.price = price;
      this.checkIn = checkIn;
      this.checkOut = checkOut;
      this.maxGuests = maxGuests;
   }
}
export default Place;
