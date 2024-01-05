<div class="sidebar-wrapper" data-simplebar="true">
    <div class="sidebar-header mt-1">
        <div class="w-1/3">
            <img src=" {{ asset('backend/assets/images/logoutama.jpeg') }}" class="" alt="">
        </div>
        <div>
            <h4 class="logo-text"></h4>
        </div>
        <div class="toggle-icon ms-auto"><i class='bx bx-arrow-to-left'></i>
        </div>
    </div>
    <!--navigation-->
    <ul class="metismenu" id="menu">
        <li>
            <a href="{{ route('dashboard') }}">
                <div class="parent-icon"><i class='bx bx-home-circle'></i>
                </div>
                <div class="menu-title">Beranda</div>
            </a>
        </li>
        <li class="menu-label">Site Management</li>
        <li>
            <a class="has-arrow" href="javascript:;">
                <div class="parent-icon"><i class="bx bx-grid-alt"></i>
                </div>
                <div class="menu-title">Category</div>
            </a>
            <ul>
                <li> <a href="{{ route('admin.categories.index') }}"><i class="bx bx-right-arrow-alt"></i>Beranda Kategori</a>
                </li>
                <li> <a href="{{ route('admin.categories.create') }}"><i class="bx bx-right-arrow-alt"></i>Tambah Kategori</a>
                </li>
            </ul>
        </li>
        <li>
            <a class="has-arrow" href="javascript:;">
                <div class="parent-icon"><i class="bx bx-server"></i>
                </div>
                <div class="menu-title">SubCategory</div>
            </a>
            <ul>
                <li> <a href="{{ route('admin.subcategories.index') }}"><i class="bx bx-right-arrow-alt"></i>Beranda SubKategori</a>
                </li>
                <li> <a href="{{ route('admin.subcategories.create') }}"><i class="bx bx-right-arrow-alt"></i>Tambah SubKategori</a>
                </li>
            </ul>
        </li>
        <li>
            <a class="has-arrow" href="javascript:;">
                <div class="parent-icon"><i class="bx bx-cart"></i>
                </div>
                <div class="menu-title">Product</div>
            </a>
            <ul>
                <li> <a href="{{ route('admin.products.index') }}"><i class="bx bx-right-arrow-alt"></i>Beranda Produk</a>
                </li>
                <li> <a href="{{ route('admin.products.create') }}"><i class="bx bx-right-arrow-alt"></i>Tambah Produk</a>
                </li>
            </ul>
        </li>
        <li>
            <a class="has-arrow" href="javascript:;">
                <div class="parent-icon"><i class="bx bx-news"></i>
                </div>
                <div class="menu-title">Review</div>
            </a>
            <ul>
                <li> <a href="{{ route('admin.reviews.index') }}"><i class="bx bx-right-arrow-alt"></i>Beranda Produk</a>
                </li>
            </ul>
        </li>
        <li>
            <a class="has-arrow" href="javascript:;">
                <div class="parent-icon"><i class="bx bx-dock-top"></i>
                </div>
                <div class="menu-title">Home Slider</div>
            </a>
            <ul>
                <li> <a href="{{ route('admin.homesliders.index') }}"><i class="bx bx-right-arrow-alt"></i>Beranda Home Slider</a>
                </li>
                <li> <a href="{{ route('admin.homesliders.create') }}"><i class="bx bx-right-arrow-alt"></i>Tambah Home Slider</a>
                </li>

            </ul>
        </li>
        <li class="menu-label">Customer Order</li>
        <li>
            <a class="has-arrow" href="javascript:;">
                <div class="parent-icon"><i class='bx bx-cart-alt'></i>
                </div>
                <div class="menu-title">Manage Order</div>
            </a>
            <ul>
                <li> <a href="{{ route('admin.pending.order') }}"><i class="bx bx-right-arrow-alt"></i>Pending Order</a>
                </li>
                <li> <a href="{{ route('admin.processing.order') }}"><i class="bx bx-right-arrow-alt"></i>Processing Order</a>
                </li>
                <li> <a href="{{ route('admin.completed.order') }}"><i class="bx bx-right-arrow-alt"></i>Completed Order</a>
                </li>
            </ul>
        </li>
        <li>
            <a href="https://galoostore.com" target="_blank">
                <div class="parent-icon"><i class="bx bx-support"></i>
                </div>
                <div class="menu-title">Support</div>
            </a>
        </li>
    </ul>
    <!--end navigation-->
</div>
