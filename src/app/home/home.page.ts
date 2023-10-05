import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Storage } from '@capacitor/storage';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  nama_lengkap: string = '';
  ttl: string = '';
  agama: string = '';
  alamat_lengkap: string = '';
  asal_sekolah: string = '';
  jenis_kelamin: string = '';
  nomor_telepon: string = '';
  email: string = '';
  history: any[] = [];

  constructor(private toastController: ToastController) {}

  ionViewDidEnter() {
    this.fetchHistory(); // Panggil fungsi untuk mengambil data dari local storage
  }

  async fetchHistory() {
    const { value } = await Storage.get({ key: 'formHistory' });
    if (value) {
      this.history = JSON.parse(value);
    } else {
      this.history = []; // Atur ulang variabel history jika tidak ada data di local storage
    }
  }

  async kirimForm() {
    const message = `Nama Lengkap: ${this.nama_lengkap}\nTTL: ${this.ttl}\nAgama: ${this.agama}\nAlamat Lengkap: ${this.alamat_lengkap}\nAsal Sekolah: ${this.asal_sekolah}\nJenis Kelamin: ${this.jenis_kelamin}\nNomor Telepon: ${this.nomor_telepon}\nEmail: ${this.email}`;

    const emailTujuan = this.email; // Use the email entered in the form as the recipient
    const emailSubject = 'Formulir'; // Specify the subject of the email

    const emailBody = encodeURIComponent(message);
    const emailUrl = `mailto:${emailTujuan}?subject=${emailSubject}&body=${emailBody}`;
    this.openLink(emailUrl);

    // Simpan data form yang baru dikirim ke halaman history
    const data = {
      id: new Date().toISOString(), // Gunakan timestamp ISO sebagai identifier
      nama_lengkap: this.nama_lengkap,
      ttl: this.ttl,
      agama: this.agama,
      alamat_lengkap: this.alamat_lengkap,
      asal_sekolah: this.asal_sekolah,
      jenis_kelamin: this.jenis_kelamin,
      nomor_telepon: this.nomor_telepon,
      email: this.email,
    };

    this.history.push(data); // Menggunakan push() untuk menambahkan data baru ke akhir array
    this.history.sort((a, b) => b.id - a.id); // Urutkan secara descending berdasarkan id

    // Simpan data history yang sudah di-update ke localStorage
    await Storage.set({ key: 'formHistory', value: JSON.stringify(this.history) });
  }

  openLink(url: string) {
    window.open(url, '_system');
  }
}
