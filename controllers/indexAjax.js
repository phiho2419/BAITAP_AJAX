
var renderTable = function (result) {
    var content = '';
    for (var i = 0; i < result.length; i++) {
        var nhanVien = result[i];
        var nv = new NhanVien(nhanVien.maNhanVien, nhanVien.tenNhanVien, nhanVien.chucVu, nhanVien.heSoChucVu, nhanVien.luongCoBan, nhanVien.soGioLamTrongThang);

        content += `
            <tr>
                <td>${nv.maNhanVien}</td>
                <td>${nv.tenNhanVien}</td>
                <td>${nv.chucVu}</td>
                <td>${nv.luongCoBan}</td>
                <td>${nv.tinhLuong()}</td>
                <td>${nv.soGioLamTrongThang}</td>
                <td>${nv.xepLoaiNhanVien()}</td>
                <td>
                <button class="btn btn-danger" onclick="xoaNhanVien('${nv.maNhanVien}')" >Xoá</button>
                <button class="btn btn-danger" onclick="chinhSuaNhanVien('${nv.maNhanVien}')" >Chỉnh sửa</button>
                </td>
            </tr>
        `
    }
    document.querySelector('#tbody').innerHTML = content;

}

var renderNhanVien = function () {
    var promise = axios({
        url: 'http://svcy.myclass.vn/api/QuanLyNhanVienApi/LayDanhSachNhanVien',
        method: 'GET'
    })

    promise.then(function (result) {
        console.log('resutl', result.data);
        renderTable(result.data);
    })

    promise.catch(function (error) {
        console.log('error', error)
    })
}

renderNhanVien();

validate = new Validation();
document.querySelector('#themNhanVien').onclick = function () {

    var nhanVien = new NhanVien();

    nhanVien.maNhanVien = document.querySelector('#maNhanVien').value;
    nhanVien.tenNhanVien = document.querySelector('#tenNhanVien').value;
    nhanVien.heSoChucVu = document.querySelector('#chucVu').value;
    nhanVien.luongCoBan = document.querySelector('#luongCoBan').value;
    nhanVien.soGioLamTrongThang = document.querySelector('#soGioLam').value;

    var arrOption = document.querySelector('#chucVu').options;
    var slChucVu = document.querySelector('#chucVu');
    nhanVien.chucVu = arrOption[slChucVu.selectedIndex].innerHTML;

    //CHECK VALID
    valid = true;

    valid &= validate.kiemTraTatCaSo('#maNhanVien', ' Mã nhân viên ', '#checkNumber_maNhanVien');

    valid &= validate.kiemTraDoDai('#maNhanVien', ' Mã nhân viên ', '#checkDoDai_maNhanVien', 4, 6);

    valid &= validate.kiemTraChu('#tenNhanVien', 'Tên nhân viên ', '#checkText_tenNhanVien');

    valid &= validate.kiemTraGiaTri('#luongCoBan', 'Lương cơ bản ', '#checkGiaTri_luongCoBan', 1000000, 20000000)
        & validate.kiemTraGiaTri('#soGioLam', 'Số giờ làm trong tháng ', '#checkGiaTri_soGioLam', 50, 150);
    if (!valid) {
        return;
    }
    //

    //GET API
    var promise = axios({
        url: 'http://svcy.myclass.vn/api/QuanLyNhanVienApi/ThemNhanVien',
        method: 'POST',
        data: nhanVien
    })

    promise.then(function (result) {
        console.log(result.data);
        renderTable(result);
    })
    promise.then(function (error) {
        console.log(error.response);
    })
}

window.xoaNhanVien = function (maNhanVien) {
    var promise = axios({
        url: `http://svcy.myclass.vn/api/QuanLyNhanVienApi/XoaNhanVien?maSinhVien=${maNhanVien}`,
        method: 'DELETE'
    })

    promise.then(function (result) {
        console.log(result.data);
        renderNhanVien();
    })

    promise.catch(function (error) {
        console.log(error.data);
    })
}

window.chinhSuaNhanVien = function (maNhanVien) {
    var promise = axios({
        url: `http://svcy.myclass.vn/api/QuanLyNhanVienApi/LayThongTinNhanVien?maNhanVien=${maNhanVien}`,
        method: 'GET'
    })

    promise.then(function (result) {
        console.log(result.data);
        var nv = result.data;
        document.querySelector('#maNhanVien').value = nv.maNhanVien;
        document.querySelector('#tenNhanVien').value = nv.tenNhanVien;    
        document.querySelector('#luongCoBan').value = nv.luongCoBan;
        document.querySelector('#soGioLam').value = nv.soGioLamTrongThang;

        var arrOption = document.querySelector('#chucVu').options;
        var slChucVu = document.querySelector('#chucVu');
        arrOption[slChucVu.selectedIndex].innerHTML = nv.chucVu;
    })

    promise.catch(function (error) {
        console.log(error.data)
    })
}

document.querySelector('#capNhatNhanVien').onclick = function () {
    var nhanVien = new NhanVien();

    nhanVien.maNhanVien = document.querySelector('#maNhanVien').value;
    nhanVien.tenNhanVien = document.querySelector('#tenNhanVien').value;
    nhanVien.heSoChucVu = document.querySelector('#chucVu').value;
    nhanVien.heSoChucVu = document.querySelector('#chucVu').value;
    nhanVien.luongCoBan = document.querySelector('#luongCoBan').value;
    nhanVien.soGioLamTrongThang = document.querySelector('#soGioLam').value;

    var arrOption = document.querySelector('#chucVu').options;
    var slChucVu = document.querySelector('#chucVu');
    nhanVien.chucVu = arrOption[slChucVu.selectedIndex].innerHTML;

    var promise = axios({
        url: `http://svcy.myclass.vn/api/QuanLyNhanVienApi/CapNhatThongTinNhanVien?maNhanVien=${nhanVien.maNhanVien}`, //be cung cấp
        method: 'PUT', //be cung cấp
        data: nhanVien,
    })

    promise.then(function (result) {
        console.log('xử lý thành công', result.data);
        renderNhanVien();
    })

    promise.catch(function (error) {
        console.log('xử lý thất bại', error.response.data);
    })

}