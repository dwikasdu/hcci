const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const config = require('../config.json')

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true, // use SSL
  auth: {
    user: config.email.EMAIL_USER,
    pass: config.email.EMAIL_PASS
  },
});

const welcomeEmailRegister = async (email, res) => {
  // generate token menggunkan JWT
  const token = jwt.sign({ email: email }, config.token.VERIFY_TOKEN_SECRET)
  //kirimkan email verifikasi
  host = config.data.FRONTEND_URL
  link = `${host}/auth/verify?id=${token}`
  mailOptions = {
    from: 'Welcome to SPMHI noreply.hrtwebplay@gmail.com', // formulir pesan masuk
    to: email, // alamat email
    subject: "Welcome",
    html: `
        <body style="margin: 0; padding: 0; width: 100%; word-break: break-word; -webkit-font-smoothing: antialiased; --bg-opacity: 1; background-color: #eceff1;">
        <div role="article" aria-roledescription="email" aria-label="Welcome to SPMHI 👋" lang="id">
          <table style=" font-family: Montserrat, -apple-system, 'Segoe UI', sans-serif; width: 100%;" width="100%" cellpadding="0" cellspacing="0" role="presentation">
            <tr>
              <td align="center" style="--bg-opacity: 1; background-color: #eceff1; font-family: Montserrat, -apple-system, 'Segoe UI', sans-serif;">
                <table class="sm-w-full" style="font-family: 'Montserrat',Arial,sans-serif; width: 600px;" width="600" cellpadding="0" cellspacing="0" role="presentation">
                  <tr>
                    <td class="sm-py-32 sm-px-24" style="font-family: Montserrat, -apple-system, 'Segoe UI', sans-serif; padding: 48px; text-align: center;" align="center">
                      
                    </td>
                  </tr>
                  <tr>
                    <td align="center" class="sm-px-24" style="font-family: 'Montserrat',Arial,sans-serif;">
                      <table style="font-family: 'Montserrat',Arial,sans-serif; width: 100%;" width="100%" cellpadding="0" cellspacing="0" role="presentation">
                        <tr>
                          <td class="sm-px-24" style="--bg-opacity: 1; border: 1px solid #e2e7ea; background-color: #ffffff; border-radius: 8px; font-family: Montserrat, -apple-system, 'Segoe UI', sans-serif; font-size: 14px; line-height: 24px; padding: 48px; text-align: left; --text-opacity: 1; color: #626262;" align="left">
                            <p style="font-weight: 600; font-size: 18px; margin-bottom: 0;">Halo</p>
                            <p style="font-weight: 700; font-size: 20px; margin-top: 0; --text-opacity: 1; color: #ff5850;">${email}</p>
                            <p class="sm-leading-32" style="font-weight: 600; font-size: 20px; margin: 0 0 24px; --text-opacity: 1; color: #263238;">
                              Selamat Bergabung Di SPMHI (Sistem Penjamin Mutu Halal Internal)
                            </p>
                            <p style="margin: 24px 0;">
                              <span style="font-weight: 600;">SPMHI</span>
                              adalah proses penetapan dan pemenuhan standar mutu halal, terhadap pengelolaan suatu produk secara internal, yang dilakukan dengan konsisten dan perbaikan berkelanjutan, sehingga stakeholders (pemangku kepentingan) memperoleh kepuasan (pemenuhan janji kepada stakeholders).
                            </p>
                            <p style="font-weight: 600; font-size: 16px; margin-bottom: 0;">Apa yang dapat anda lakukan?</p>
                            <ul style="margin-bottom: 24px;">
                                <li>Register Produk</li>
                                <li>Register Bahan Baku</li>
                                <li>Register Step Peroses Produk</li>
                                <li>Akad Pernyataan Halal</li>
                                <li>Sertifikat Halal setiap produk</li>
                            </ul>
                            <table style="font-family: 'Montserrat',Arial,sans-serif;" cellpadding="0" cellspacing="0" role="presentation">
                              <tr>
                                <td style="mso-padding-alt: 16px 24px; --bg-opacity: 1; background-color: #7367f0; border-radius: 4px; font-family: Montserrat, -apple-system, 'Segoe UI', sans-serif;">
                                  <a href="http://spmhi.com" style="display: block; font-weight: 600; font-size: 14px; line-height: 100%; padding: 16px 24px; --text-opacity: 1; color: #ffffff; text-decoration: none;">Masuk &rarr;</a>
                                </td>
                              </tr>
                            </table>
                            <table style="font-family: 'Montserrat',Arial,sans-serif; width: 100%;" width="100%" cellpadding="0" cellspacing="0" role="presentation">
                              <tr>
                                <td style="font-family: 'Montserrat',Arial,sans-serif; padding-top: 32px; padding-bottom: 32px;">
                                  <div style="--bg-opacity: 1; background-color: #eceff1; height: 1px; line-height: 1px;">&zwnj;</div>
                                </td>
                              </tr>
                            </table>
                            <p style="margin: 0 0 16px;">Terimakasih, <br>Telah menjadi bagian dari spmhi.</p>
                          </td>
                        </tr>
                        <tr>
                          <td style="font-family: 'Montserrat',Arial,sans-serif; height: 20px;" height="20"></td>
                        </tr>
                        <tr>
                          <td style="font-family: Montserrat, -apple-system, 'Segoe UI', sans-serif; font-size: 12px; padding-left: 48px; padding-right: 48px; --text-opacity: 1; color: #eceff1;">
                            <div class="h5">
                                <div style="text-align:left">
                                <div style="font-family:Roboto-Regular,Helvetica,Arial,sans-serif;color:rgba(0,0,0,0.54);font-size:11px;line-height:18px;padding-top:12px;text-align:center">
                                <div>Anda menerima email ini sebagai pemberitahuan tentang perubahan
                                penting pada layanan dan Akun Member Anda.</div>
                                <div style="direction:ltr">© 2021 SPMHI,
                                <a class="credit-footer" style="font-family:Roboto-Regular,Helvetica,Arial,sans-serif;color:rgba(0,0,0,0.54);font-size:11px;line-height:18px;padding-top:12px;text-align:center">
                                Malang, Jawa Timur, Indonesia.
                                </a>
                                </div>
                                </div>
                                </div>
                        </tr>
                        <tr>
                          <td style="font-family: 'Montserrat',Arial,sans-serif; height: 16px;" height="16"></td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </div>
      </body>
        `
  }

  await transporter.sendMail(mailOptions, function (error, response) {
    // if (error) {
    //   res.status(202).json({
    //     status: 200,
    //     isRegistered: false,
    //     message: "Email verfikasi gagal terkirim"
    //   });
    // } else {
    //   res.status(204).json({
    //     status: 200,
    //     isRegistered: true,
    //     message: `Data berhasil disimpan`
    //   });
    // }
  })
}

const verifikasiEmailRegister = async (email, res) => {
  // generate token menggunkan JWT
  const token = jwt.sign({ email: email }, config.token.VERIFY_TOKEN_SECRET)
  //kirimkan email verifikasi
  host = config.data.FRONTEND_URL
  link = `${host}/auth/verify?id=${token}`
  mailOptions = {
    from: 'SPMHI Verification noreply.hrtwebplay@gmail.com', // formulir pesan masuk
    to: email, // alamat email
    subject: "Verifikasi Email",
    html: `Hallo, <br> Please klik tautan verifikasi berikut <br>"
            "<a href="${link}">Click here to verifikasi</a>
            <br/> Kode verifikasi anda <br/> <pre>${token}</pre>`
  }

  await transporter.sendMail(mailOptions, function (error, response) {
    if (error) {
      res.status(204).json({
        status: 200,
        isRegistered: false,
        message: "Email verfikasi gagal terkirim"
      });
    } else {
      res.status(200).json({
        status: 200,
        isRegistered: true,
        message: `Email verfikasi telah dikirim ke ${email}. Silahkan verifikasi email anda.`
      });
    }
  })
}

const verifikasiEmailLupaPassword = async (email, data, res) => {
  // generate token menggunkan JWT
  const token = jwt.sign({ email: email }, config.token.VERIFY_TOKEN_SECRET, { algorithm: 'HS256', expiresIn: "2h" })
  const ubahPassword = jwt.sign({
    email: email,
    nama_perusahaan: data[0].NAMA_PERUSAHAAN,
    nama_penanggung_jawab: data[0].NAMA_PENANGGUNG_JAWAB,
    nama_pemilik: data[0].NAMA_PEMILIK
  }, config.token.UBAH_PWD_SECRET)

  //kirimkan email verifikasi
  host = config.data.FRONTEND_URL
  link = `${host}/ubah-password/auth?_key=${token}`
  mailOptions = {
    from: 'SPMHI Security noreply.hrtwebplay@gmail.com', // formulir pesan masuk
    replyTo: 'noreply.hrtwebplay@gmail.com',
    to: email, // alamat email
    subject: "Lupa Password",
    html: `<div style="margin:0;padding:0" bgcolor="#FFFFFF">
        <table width="100%" height="100%" style="min-width:348px" border="0" cellspacing="0" cellpadding="0" lang="en">
        <tbody>
        <tr height="32" style="height:32px"><td></td></tr>
        <tr align="center">
        <td>
        <table border="0" cellspacing="0" cellpadding="0" style="padding-bottom:20px;max-width:516px;min-width:220px">
        <tbody>
        <tr>
        <td width="8" style="width:8px"></td>
        <td>
        <div style="border-style:solid;border-width:thin;border-color:#dadce0;border-radius:8px;padding:40px 20px" align="center" class="container">
        <div style="font-family:'Google Sans',Roboto,RobotoDraft,Helvetica,Arial,sans-serif;color:rgba(0,0,0,0.87);line-height:32px;padding-bottom:24px;text-align:center;word-break:break-word">
        <div style="font-size:24px">
        Token ganti password dibuat untuk akun anda
        </div>
        <table align="center" style="margin-top:8px">
        <tbody>
        <tr style="line-height:normal">
        <td>
        <a style="font-family:'Google Sans',Roboto,RobotoDraft,Helvetica,Arial,sans-serif;color:rgba(0,0,0,0.87);font-size:14px;line-height:20px">
        ${email}
        </a>
        </td>
        </tr>
        </tbody>
        </table>
        </div>
        <div style="font-family:Roboto-Regular,Helvetica,Arial,sans-serif;font-size:14px;color:rgba(0,0,0,0.87);padding-bottom:10px;text-align:left">
        <i>Gunakan kode berikut untuk melakukan perubahan password.</i>
        </div>
        <span style="font-family:Roboto-Regular,Helvetica,Arial,sans-serif;margin:20px10px;padding:20px;border-style:solid;border-width:thin;border-color:#dadce0;border-radius:8px;position:relative;box-shadow:0 1px 1px rgb(000/8%);display:block;overflow-y:hidden;overflow-x:hidden;font-size:14px;background:#ebeef3;color:#000;line-height:1.5;text-align:left;word-spacing:0;max-height:350px;">
        ${ubahPassword}
        </span>
        <div style="font-family:Roboto-Regular,Helvetica,Arial,sans-serif;font-size:14px;color:rgba(0,0,0,0.87);line-height:20px;padding-top:20px;text-align:left">
        Jika bukan Anda yang membuat sandi ini untuk Email di Komputer Windows saya,
        mungkin akun Anda digunakan orang lain. Periksa dan amankan akun Anda
        sekarang.
        <div style="padding-top:32px;text-align:center">
        <a href="${link}" style="font-family:'Google Sans',Roboto,RobotoDraft,Helvetica,Arial,sans-serif;line-height:16px;color:#ffffff;font-weight:200;text-decoration:none;font-size:14px;display:inline-block;padding:10px 24px;background-color:#4184f3;border-radius:5px;min-width:90px" target="_blank">
        Ubah Password
        </a>
        </div>
        </div>
        <span class="im">
        <div style="padding-top:20px;font-size:12px;line-height:16px;color:#5f6368;letter-spacing:0.3px;text-align:center">
        Anda juga dapat melihat aktivitas keamanan di<br>
        <a style="color:rgba(0,0,0,0.87);text-decoration:inherit">spmhi.com</a>
        </div>
        </span>
        </div>
        <div>
        <div class="h5">
        <div style="text-align:left">
        <div style="font-family:Roboto-Regular,Helvetica,Arial,sans-serif;color:rgba(0,0,0,0.54);font-size:11px;line-height:18px;padding-top:12px;text-align:center">
        <div>Anda menerima email ini sebagai pemberitahuan tentang perubahan
        penting pada layanan dan Akun Member Anda.</div>
        <div style="direction:ltr">© 2021 SPMHI,
        <a class="credit-footer" style="font-family:Roboto-Regular,Helvetica,Arial,sans-serif;color:rgba(0,0,0,0.54);font-size:11px;line-height:18px;padding-top:12px;text-align:center">
        Malang, Jawa Timur, Indonesia.
        </a>
        </div>
        </div>
        </div>
        </div>
        </div>
        </td>
        </tr>
        </tbody>
        </table>
        </td>
        </tr>
        </tbody>
        </table>
        </div>`
  }

  await transporter.sendMail(mailOptions, function (error, response) {
    if (error) {
      res.status(200).json({
        isRegistered: false,
        message: "Email verfikasi gagal terkirim"
      });
    } else {
      res.status(200).json({
        status: 200,
        isRegistered: true,
        message: `Sukses!. Link ganti password telah dikirim.`
      });
    }
  })
}

const notifEmailUbahPassword = async (email, message, res) => {
  //kirimkan email verifikasi
  host = config.data.FRONTEND_URL
  link = `${host}/login`
  mailOptions = {
    from: 'SPMHI Security noreply.hrtwebplay@gmail.com', // formulir pesan masuk
    to: email, // alamat email
    subject: "Perubahan password",
    html: `
        <body style="margin: 0; padding: 0; width: 100%; word-break: break-word; -webkit-font-smoothing: antialiased; --bg-opacity: 1; background-color: #eceff1;">
        <div role="article" aria-roledescription="email" aria-label="Ubah Password" lang="id">
          <table style=" font-family: Montserrat, -apple-system, 'Segoe UI', sans-serif; width: 100%;" width="100%" cellpadding="0" cellspacing="0" role="presentation">
            <tr>
              <td align="center" style="--bg-opacity: 1; background-color: #eceff1; font-family: Montserrat, -apple-system, 'Segoe UI', sans-serif;">
                <table class="sm-w-full" style="font-family: 'Montserrat',Arial,sans-serif; width: 600px;" width="600" cellpadding="0" cellspacing="0" role="presentation">
                  <tr>
                    <td class="sm-py-32 sm-px-24" style="font-family: Montserrat, -apple-system, 'Segoe UI', sans-serif; padding: 48px; text-align: center;" align="center">
                      
                    </td>
                  </tr>
                  <tr>
                    <td align="center" class="sm-px-24" style="font-family: 'Montserrat',Arial,sans-serif;">
                      <table style="font-family: 'Montserrat',Arial,sans-serif; width: 100%;" width="100%" cellpadding="0" cellspacing="0" role="presentation">
                        <tr>
                          <td class="sm-px-24" style="--bg-opacity: 1; border: 1px solid #e2e7ea; background-color: #ffffff; border-radius: 8px; font-family: Montserrat, -apple-system, 'Segoe UI', sans-serif; font-size: 14px; line-height: 24px; padding: 48px; text-align: left; --text-opacity: 1; color: #626262;" align="left">
                            <p style="font-weight: 600; font-size: 18px; margin-bottom: 0;">Halo</p>
                            <p style="font-weight: 700; font-size: 20px; margin-top: 0; --text-opacity: 1; color: #ff5850;">${message.nama_penanggung_jawab}</p>
                            <p class="sm-leading-32" style="font-weight: 600; font-size: 20px; margin: 0 0 24px; --text-opacity: 1; color: #263238;">
                              Selamat Password Anda Telah diganti.
                            </p>
                            <p style="margin: 24px 0;">
                              Baru saja anda telah melakukan perubahan password. Jika ini bukan anda silahkan hubungi kami untuk melakukan tindakan.
                            </p>
                            <table style="font-family: 'Montserrat',Arial,sans-serif;" cellpadding="0" cellspacing="0" role="presentation">
                              <tr>
                                <td style="mso-padding-alt: 16px 24px; --bg-opacity: 1; background-color: #7367f0; border-radius: 4px; font-family: Montserrat, -apple-system, 'Segoe UI', sans-serif;">
                                  <a href="${link}" style="display: block; font-weight: 600; font-size: 14px; line-height: 100%; padding: 16px 24px; --text-opacity: 1; color: #ffffff; text-decoration: none;">Masuk &rarr;</a>
                                </td>
                              </tr>
                            </table>
                            <table style="font-family: 'Montserrat',Arial,sans-serif; width: 100%;" width="100%" cellpadding="0" cellspacing="0" role="presentation">
                              <tr>
                                <td style="font-family: 'Montserrat',Arial,sans-serif; padding-top: 32px; padding-bottom: 32px;">
                                  <div style="--bg-opacity: 1; background-color: #eceff1; height: 1px; line-height: 1px;">&zwnj;</div>
                                </td>
                              </tr>
                            </table>
                            <p style="margin: 0 0 16px;">Terimakasih, <br>Telah menjadi bagian dari spmhi.</p>
                          </td>
                        </tr>
                        <tr>
                          <td style="font-family: 'Montserrat',Arial,sans-serif; height: 20px;" height="20"></td>
                        </tr>
                        <tr>
                          <td style="font-family: Montserrat, -apple-system, 'Segoe UI', sans-serif; font-size: 12px; padding-left: 48px; padding-right: 48px; --text-opacity: 1; color: #eceff1;">
                            <div class="h5">
                                <div style="text-align:left">
                                <div style="font-family:Roboto-Regular,Helvetica,Arial,sans-serif;color:rgba(0,0,0,0.54);font-size:11px;line-height:18px;padding-top:12px;text-align:center">
                                <div>Anda menerima email ini sebagai pemberitahuan tentang perubahan
                                penting pada layanan dan Akun Member Anda.</div>
                                <div style="direction:ltr">© 2021 SPMHI,
                                <a class="credit-footer" style="font-family:Roboto-Regular,Helvetica,Arial,sans-serif;color:rgba(0,0,0,0.54);font-size:11px;line-height:18px;padding-top:12px;text-align:center">
                                Malang, Jawa Timur, Indonesia.
                                </a>
                                </div>
                                </div>
                                </div>
                        </tr>
                        <tr>
                          <td style="font-family: 'Montserrat',Arial,sans-serif; height: 16px;" height="16"></td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </div>
      </body>
  `
  }

  await transporter.sendMail(mailOptions, function (error, response) {
    if (error) {
      res.status(200).json({
        status: 200,
        isRegistered: true,
        message: `Email ${email} tidak valid, Namun data berhasil diubah.`
      });
      console.log(email);
    } else {
      res.status(200).json({
        status: 200,
        isRegistered: true,
        message: `Sukses. Password berhasil di ubah.`
      });
    }
  })
}


module.exports = {
  welcomeEmailRegister,
  verifikasiEmailRegister,
  verifikasiEmailLupaPassword,
  notifEmailUbahPassword
};
