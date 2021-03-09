var NhanVien = function( maNV , tenNV , cVu , hsChucVu , luongCB , soGL){
    this.maNhanVien = maNV;
    this.tenNhanVien = tenNV;
    this.chucVu = cVu;
    this.heSoChucVu = hsChucVu;
    this.luongCoBan = luongCB;
    this.soGioLamTrongThang = soGL ;

    this.xepLoaiNhanVien = function(){
        var xepLoai = '';
        if(this.soGioLamTrongThang < 50){
            xepLoai = 'Nhân viên kém';
        }else if(this.soGioLamTrongThang >= 50 && this.soGioLamTrongThang < 80){
            xepLoai = 'Nhân viên trung bình';
        }else if(this.soGioLamTrongThang >= 80 && this.soGioLamTrongThang < 100){
            xepLoai = 'Nhân viên khá';
        }else if(this.soGioLamTrongThang >= 100 && this.soGioLamTrongThang < 120){
            xepLoai = 'Nhân viên giỏi';
        }else{
            xepLoai = 'Nhân viên xuất sắc';
        }
        return xepLoai;
    }

    this.tinhLuong = function(){
        var tongLuong = this.heSoChucVu * this.luongCoBan;
        return tongLuong;
    }

}