const carService = require("../../../services/carService");
const bookingService = require("../../../services/bookingService");
const emailService = require("../../../services/emailService");

module.exports = {

  async dataBookings(req, res) {
    bookingService
      .list()
      .then(({ bookings }) => {
        res.status(200).json({
          status: "Success",
          data: bookings
        });
      })
      .catch((err) => {
        res.status(400).json({
          status: "FAIL",
          message: err.message,
        });
      });
  },

  async listBooking(req, res) {
    bookingService
      .list()
      .then(({ bookings }) => {
        console.log("list bookings")
        console.log(bookings)
        res.render("./dashboardBooking", { bookings });
      })
      .catch((err) => {
        res.status(400).json({
          status: "FAIL",
          message: err.message,
        });
      });
  },

  createBooking(req, res) {
    console.log(req.body.email);
    bookingService
      .create({
        car_id: req.body.car_id,
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email,
        booking_date: req.body.booking_date,
        duration: req.body.duration,
        total_price: req.body.total_price
      })
      .then((book) => {
        // Kirim email notifikasi admin
        emailService.sendEmail(
          process.env.EMAIL_USER,
          '[BCR - Administrator] - Informasi Booking',
          `Terdapat booking mobil dengan detail sebagai berikut.`,
          `<p>Terdapat booking mobil dengan detail sebagai berikut: </p>
          <table border="1" cellpadding="10" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif;">
            <thead>
              <tr style="background-color: #f2f2f2;">
                <th>Nama Pelanggan</th>
                <th>No HP</th>
                <th>Jenis Mobil</th>
                <th>Tanggal Booking</th>
                <th>Durasi</th>
                <th>Total Harga</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>${req.body.name}</td>
                <td>${req.body.phone}</td>
                <td>${req.body.car_name}</td>
                <td>${req.body.booking_date}</td>
                <td>${req.body.duration} hari</td>
                <td>Rp${Number(req.body.total_price).toLocaleString('id-ID')}</td>
              </tr>
            </tbody>
          </table>
          <p>Silahkan buka aplikasi BCR Rental Car Admin untuk mengkonfirmasi booking.</p>
          `
        );

        // Kirim email notifikasi pelanggan
        emailService.sendEmail(
          req.body.email,
          '[BCR] - Booking Berhasil',
          `Terimakasih telah booking mobil di BCR Rental Car.`,
          `<p>Terimakasih telah booking mobil di BCR Rental Car. Berikut detail booking anda : </p><br/>
          <table border="1" cellpadding="10" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif;">
            <thead>
              <tr style="background-color: #f2f2f2;">
                <th>Nama Pelanggan</th>
                <th>No HP</th>
                <th>Jenis Mobil</th>
                <th>Tanggal Booking</th>
                <th>Durasi</th>
                <th>Total Harga</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>${req.body.name}</td>
                <td>${req.body.phone}</td>
                <td>${req.body.car_name}</td>
                <td>${req.body.booking_date}</td>
                <td>${req.body.duration} hari</td>
                <td>Rp${Number(req.body.total_price).toLocaleString('id-ID')}</td>
              </tr>
            </tbody>
          </table>
          <br>
          <p>Anda dapat melakukan DP sebesar 50% atau pembayaran full melalui rekening berikut :</p>
          <p><b>BCA a.n BCR Rental Car : 000011111</b></p> 
          <p>Hubungi kami pada link berikut untuk konfirmasi bukti transfer : </p>
          <p><a href='https://wa.me/62895334736124'>Link WhatsApp Admin</a></p><br/>
          <p>Terimakasih, </p>
          <p>BCR Rental Car</p>
          `
        );

        res.redirect('/booking/' + req.body.car_id + '?success=1');
      })
      .catch((err) => {
        res.status(422).json({
          status: "FAIL",
          message: err.message,
        });
      });
  },


  async updateStatus(req, res) {
    console.log("UPDATE STATUS")
    console.log(req.body.booking_id)
    bookingService
      .update(req.body.booking_id, {
        status: req.body.status
      })
      .then(() => {
        res.redirect("/listbooking");
      })
      .catch((err) => {
        res.status(422).json({
          status: "FAIL",
          message: err.message,
        });
      });
  }
};
