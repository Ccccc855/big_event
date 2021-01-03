 $(function () {


     // 1.1 获取裁剪区域的 DOM 元素
     var $image = $('#image')
     // 1.2 配置选项
     const options = {
         // 纵横比
         aspectRatio: 1,
         // 指定预览区域
         preview: '.img-preview'
     }

     // 1.3 创建裁剪区域
     $image.cropper(options)

     var layer = layui.layer
     //  给上传按钮 绑定点击事件
     $('#btn-sc').click(function () {
         $('#file').click()
     })

     //  通过change 事件 获取 上传的图片
     $('#file').change(function (e) {
         //  获取上传的图片
         var filelist = e.target.files
         console.log(filelist);
         if (filelist.length === 0) {
             return layer.msg('请选择图片')
         }
         // 更换裁剪的图片
         var file = e.target.files[0]
         var newImgURL = URL.createObjectURL(file)
         $image
             .cropper('destroy') // 销毁旧的裁剪区域
             .attr('src', newImgURL) // 重新设置图片路径
             .cropper(options) // 重新初始化裁剪区域


     })

     $('#btn-qd').click(function () {
         var dataURL = $image
             .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                 width: 100,
                 height: 100
             })
             .toDataURL('image/png') // 将 Canvas 画布上的内容，转化为 base64 格式的字符串
         $.ajax({
             type: "POST",
             url: "/my/update/avatar",
             data: {
                 avatar: dataURL
             },
             success: function (res) {
                 console.log(res);
                 if (res.status !== 0) {
                     return layer.msg(res.message)
                 }
                 layer.msg(res.message)
                 window.parent.fn()
             }
         });
     })

 })