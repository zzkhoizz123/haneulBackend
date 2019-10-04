const Router = require('express')

const customerController = require('../../controllers/customer.controller')
const router = new Router()

/**
 * @swagger
 * /customer:
 *   post:
 *     tags:
 *       - Customer
 *     description: get customer
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: supplierID
 *         description:
 *         in: body
 *         required: true
 *         schema:
 *           type: integer
 *       - name: nguoiDungID
 *         description: the staff is searching
 *         in: body
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Successfully get customer
 *         schema:
 *           type: object
 *           properties:
 *             SupplierID:
 *               type: string
 *             SupplierName:
 *               type: string
 *             Phone:
 *               type: string
 *             Phone1:
 *               type: string
 *             Phone2:
 *               type: string
 *             Phone3:
 *               type: string
 *             So:
 *               type: string
 *             Duong:
 *               type: string
 *             Phuong:
 *               type: string
 *             Quan:
 *               type: string
 *             Tinh:
 *               type: string
 *             MaDonVi:
 *               type: string
 *             NhomKhachHang:
 *               type: string
 *             Address:
 *               type: string
 *             NgayGioGoi:
 *               type: string
 *             Line:
 *               type: string
 *             GhiChu:
 *               type: string
 *             TongGhiChu:
 *               type: integer
 *             DanhGia:
 *               type: integer
 *             NguonID:
 *               type: integer
 *             AnhCaNhan:
 *               type: string
 *             AnhCMND:
 *               type: string
 *             AnhMatTruocThe:
 *               type: string
 *             DongY:
 *               type: boolean
 *             ThoiGianVay:
 *               type: integer
 *             KhoanVay:
 *               type: integer
 *             DanhXung:
 *               type: string
 *             GioiTinh:
 *               type: boolean
 *             DacDiem:
 *               type: string
 *             Tax:
 *               type: string
 *             Email:
 *               type: string
 *             NgaySinh:
 *               type: string
 *             FaceBook:
 *               type: string
 *             NgayXuat:
 *               type: string
 *             TenChiNhanh:
 *               type: string
 *             MaSanPham:
 *               type: string
 *             TenSanPham:
 *               type: string
 *             SoLuong:
 *               type: integer
 *             DonGia:
 *               type: integer
 *             NhanVienKinhDoanhID:
 *               type: string
 *             TenNhanVienKinhDoanh:
 *               type: string
 *             QuanLyTrucTiepID:
 *               type: integer
 *             TenQuanLyTrucTiep:
 *               type: string
 *             NhanVienChamSocID:
 *               type: string
 *             TenNhanVienChamSoc:
 *               type: string
 *             CMND:
 *               type: string
 *             NgayCapCMND:
 *               type: string
 *             NguoiGioiThieu:
 *               type: string
 *             SDTNguoiGioiThieu:
 *               type: string
 *             NgheNghiep:
 *               type: string
 *             ChucVu:
 *               type: integer
 *             DiaChiLienHe:
 *               type: string
 */
router.route('/').get(customerController.getCustomer)

module.exports = router
