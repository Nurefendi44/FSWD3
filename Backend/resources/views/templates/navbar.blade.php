<!doctype html>
<html>
    <script>
        function redirect() {
            var informasi = document.getElementById("informasi").value;
            var galeri = document.getElementById("galeri").value;
            var berita = document.getElementById("berita").value;
            var sponsor = document.getElementById("sponsor").value;
            var url = "";

            if (informasi === "hotel") {
                url = "/admin/hotels";
            } else if (informasi === "transportasi") {
                url = "/admin/transportasis";
            } else if (informasi === "venue") {
                url = "/admin/venues";
            } else if (informasi === "bidang") {
                url = "/admin/bidangs";
            } else if (informasi === "catering") {
                url = "/admin/caterings";
            } else if (galeri === "foto") {
                url = "/admin/fotos";
            } else if (galeri === "video") {
                url = "/admin/videos";
            } else if (berita === "kategori") {
                url = "/admin/categories";
            } else if (berita === "berita") {
                url = "/admin/news";
            } else if (sponsor === "sponsor") {
                url = "/admin/sponsors";
            }else if (sponsor === "powered") {
                url = "/admin/powerbies";
            }

            if (url !== "") {
                window.location.href = url;
            }
        }
    </script>
<div class="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-secondary">

    <div class="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
        <img class="justify-center mx-auto mt-24" src="{{ asset('backend/assets/images/logoutama.jpeg') }}" width="140" alt="" />
    </br>
        <a href="/" class="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none">
            <Strong class="fs-5 d-none d-sm-inline">Menu</Strong>
        </a>
        <ul class="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
            <li class="nav-item" style="width: 150px;">
                <a href="/homesliders" class="nav-link align-middle px-0">
                    <button class="btn btn-light text-dark text-left" style="width: 135%;">
                        <i class="fs-4 bi-house"></i> <span class="ms-1 d-none d-sm-inline">Home Slider</span>
                    </button>
                </a>
            </li>
            <li class="nav-item" style="width: 150px;">
                <a href="/admin/timelines" class="nav-link align-middle px-0">
                    <button class="btn btn-light text-dark text-left mb-2" style="width: 135%;">
                        <i class="fs-4 bi-house"></i> <span class="ms-1 d-none d-sm-inline">Timeline</span>
                    </button>
                </a>
            </li>


            <li class="nav-item" style="width: 150px;">
                <select id="informasi" class="form-control mb-3" style="width: 135%;" onchange="redirect()">
                    <option value="">Informasi</option>
                    <option value="bidang">Bidang</option>
                    <option value="venue">Venue</option>
                    <option value="hotel">Hotel</option>
                    <option value="transportasi">Transportasi</option>
                    <option value="catering">Catering</option>
                </select>
            </li>

            <li class="nav-item" style="width: 150px;">
                <select id="galeri" class="form-control mb-3" style="width: 135%;" onchange="redirect()">
                    <option value="">Galeri</option>
                    <option value="foto">Foto</option>
                    <option value="video">Video</option>
                </select>
            </li>

            <li class="nav-item" style="width: 150px;">
                <select id="berita" class="form-control mb-3" style="width: 135%;" onchange="redirect()">
                    <option value="">News</option>
                    <option value="kategori">Kategori</option>
                    <option value="berita">Berita</option>
                </select>
            </li>

            <li class="nav-item" style="width: 150px;">
                <select id="sponsor" class="form-control mb-2" style="width: 135%;" onchange="redirect()">
                    <option value="">Sponsor & PowerBy</option>
                    <option value="sponsor">Sponsor</option>
                    <option value="powered">PoweredBy</option>
                </select>
            </li>

            <li class="nav-item" style="width: 150px;">
                <a href="/actionlogout" class="nav-link align-middle px-0">
                    <button class="btn btn-danger" style="width: 135%;">
                        <i class="bi-house"></i> <span class="ms-1 d-none d-sm-inline">Logout</span>
                    </button>
                </a>
            </li>


        </ul>
        <hr>


    </div>
</div>
</html>
