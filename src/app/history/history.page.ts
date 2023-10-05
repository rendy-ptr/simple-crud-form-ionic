import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@capacitor/storage';

interface FormItem {
  nama_lengkap: string;
  ttl: string;
  agama: string;
  alamat_lengkap: string;
  asal_sekolah: string;
  jenis_kelamin: string;
  nomor_telepon: string;
  email: string;
}

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
})
export class HistoryPage {
  history: FormItem[] = [];

  constructor(private router: Router) {}

  ionViewDidEnter() {
    // Ambil data dari localStorage ketika halaman dimuat
    this.fetchHistory();
  }

  async fetchHistory() {
    const { value } = await Storage.get({ key: 'formHistory' });
    if (value) {
      this.history = JSON.parse(value);
    }
  }

  editItem(item: FormItem) {
    this.router.navigate(['/edit'], { state: { item: item } });
  }

  async deleteItem(item: FormItem) {
    const index = this.history.findIndex((el: FormItem) => el.email === item.email);
    if (index > -1) {
      this.history.splice(index, 1);
      await Storage.set({ key: 'formHistory', value: JSON.stringify(this.history) });

      // Perbarui data history setelah menghapus data dari halaman history
      this.fetchHistory();

      // Simpan data history ke local storage setelah ada perubahan
      this.saveHistory();
    }
  }

  // Fungsi untuk menyimpan data history ke local storage
  async saveHistory() {
    await Storage.set({ key: 'formHistory', value: JSON.stringify(this.history) });
  }
}
