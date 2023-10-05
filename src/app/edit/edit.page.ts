import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
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
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage {
  item: FormItem;
  editedItemIndex: number = -1;

  constructor(private router: Router, private route: ActivatedRoute) {
    const item = this.router.getCurrentNavigation()?.extras.state?.['item'];
    this.item = { ...item }; // Salin data item ke properti item agar data yang sedang diubah tidak merubah data asli
  }

  ionViewDidEnter() {
    // Cari indeks data yang akan diedit dalam array history
    this.fetchHistory();
  }

  async fetchHistory() {
    const { value } = await Storage.get({ key: 'formHistory' });
    const history: FormItem[] = value ? JSON.parse(value) : [];
    this.editedItemIndex = history.findIndex((el: FormItem) => el.email === this.item.email);
  }

  async updateItem() {
    // Cari data yang akan diedit dalam array history
    const { value } = await Storage.get({ key: 'formHistory' });
    const history: FormItem[] = value ? JSON.parse(value) : [];

    if (this.editedItemIndex > -1) {
      // Update data form dengan data yang sudah diedit
      history[this.editedItemIndex] = this.item;

      // Simpan data history yang sudah di-update ke localStorage
      await Storage.set({ key: 'formHistory', value: JSON.stringify(history) });

      // Navigasi kembali ke halaman history setelah data di-update
      this.router.navigate(['/history']);
    }
  }

  cancelEdit() {
    // Navigasi kembali ke halaman history tanpa menyimpan perubahan
    this.router.navigate(['/history']);
  }
}
