@extends('admin.admin_master')

@section('title')Edit Product | Admin @endsection

@section('content')
<div class="page-wrapper">
    <div class="page-content">

        <!--breadcrumb-->
        <div class="page-breadcrumb d-none d-sm-flex align-items-center mb-3">
            <div class="breadcrumb-title pe-3">Produk Galoo Store</div>
            <div class="ps-3">
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb mb-0 p-0">
                        <li class="breadcrumb-item"><a href="javascript:;"><i class="bx bx-home-alt"></i></a>
                        </li>
                        <li class="breadcrumb-item active" aria-current="page">Edit Produk</li>
                    </ol>
                </nav>
            </div>
        </div>
        <!--end breadcrumb-->

        <div class="card">
            <div class="card-body p-4">
                <h5 class="card-title">Edit Produk Galoo Store</h5>
                <hr />
                <div class="form-body mt-4">
                    <form action="{{ route('admin.products.update', $product->id)  }}" method="POST" enctype="multipart/form-data">
                        @csrf
                        @method('PUT') <!-- Menggunakan metode PUT untuk pembaruan -->
                        <div class="row">
                            <div class="col-lg-8">
                                <div class="border border-3 p-4 rounded">
                                    <div class="mb-3">
                                        <label for="inputProductTitle" class="form-label">Nama Produk</label>
                                        <input type="text" name="product_name" class="form-control" placeholder="Masukkan Nama Produk" value="{{ $product->product_name }}">
                                        @error('product_name')
                                        <span class="text-danger">{{ $message }}</span>
                                        @enderror
                                    </div>

                                    <div class="mb-3">
                                        <label for="inputProductTitle" class="form-label">Gambar Produk</label>
                                        <div class="text-secondary">
                                            <input name="product_image" class="form-control" type="file" id="product_image" />
                                            @error('product_image')
                                            <span class="text-danger">{{ $message }}</span>
                                            @enderror
                                        </div>
                                    </div>
                                    <div class="mb-3">
                                        <div class="text-secondary">
                                            <img id="showImage" src="{{ url('img/no_image.jpg') }}" alt="profile_preview" class="img-thumbnail shadow-sm" width="110">
                                        </div>
                                    </div>

                                    <div class="mb-3">
                                        <label for="inputProductTitle" class="form-label">Gambar Satu</label>
                                        <div class="text-secondary">
                                            <input name="product_image1" class="form-control" type="file" />
                                            @error('product_image1')
                                            <span class="text-danger">{{ $message }}</span>
                                            @enderror
                                        </div>
                                    </div>

                                    <div class="mb-3">
                                        <label for="inputProductTitle" class="form-label">Gambar Dua</label>
                                        <div class="text-secondary">
                                            <input name="product_image2" class="form-control" type="file" />
                                            @error('product_image2')
                                            <span class="text-danger">{{ $message }}</span>
                                            @enderror
                                        </div>
                                    </div>

                                    <div class="mb-3">
                                        <label for="inputProductTitle" class="form-label">Gambar Tiga</label>
                                        <div class="text-secondary">
                                            <input name="product_image3" class="form-control" type="file" />
                                            @error('product_image3')
                                            <span class="text-danger">{{ $message }}</span>
                                            @enderror
                                        </div>
                                    </div>

                                    <div class="mb-3">
                                        <label for="specification" class="form-label">Spesisfikasi Produk</label>
                                        <textarea name="specification" class="form-control" id="specificationTextarea" rows="3">{{ $product->specification }}</textarea>
                                    </div>

                                    <div class="mb-3">
                                        <label for="description" class="form-label">Deskripsi Produk</label>
                                        <textarea name="description" class="form-control" id="descriptionTextarea" rows="3">{{ $product->description }}</textarea>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-4">
                                <div class="border border-3 p-4 rounded">
                                    <div class="row g-3">
                                        <div class="col-md-6">
                                            <label for="inputCompareatprice" class="form-label">Stok</label>
                                            <input type="text" name="stock" class="form-control" placeholder="0" value="{{ $product->stock }}">
                                        </div>
                                        <div class="col-md-6">
                                            <label for="inputPrice" class="form-label">Harga</label>
                                            <input type="text" name="price" class="form-control" placeholder="0" value="{{ $product->price }}">
                                        </div>

                                        <div class="col-12">
                                            <label for="inputProductType" class="form-label">Kategori</label>
                                            <select class="form-select" name="categories_id">
                                                <option selected>Piih Kategori</option>
                                                @foreach ($categories as $category)
                                                <option value="{{ $category->id }}" {{ $category->category_name == $product->category ? 'selected' : '' }}>{{ $category->category_name }}</option>
                                                @endforeach
                                            </select>
                                        </div>
                                        <div class="col-12">
                                            <label for="inputProductType" class="form-label">SubKategori</label>
                                            <select class="form-select" name="subcategories_id">
                                                <option selected>Pilih Subkategori</option>
                                                @foreach ($subcategories as $subcategory)
                                                <option value="{{ $subcategory->id }}" {{ $subcategory->subcategory_name == $product->subcategory ? 'selected' : '' }}>{{ $subcategory->subcategory_name }}</option>
                                                @endforeach
                                            </select>
                                        </div>
                                        <div class="mb-3">
                                            <label class="form-label">variant</label>
                                            <input type="text" name="variant" class="form-control" data-role="tagsinput" value="{{ $product->variant }}">
                                        </div>
                                        <div class="col-12">
                                            <div class="d-grid">
                                                <button type="submit" class="btn btn bg-success text-white">Update Product</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!--end row-->
                    </form>
                </div>
            </div>
        </div>

    </div>
</div>

<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
<!-- Show Image Ajax -->
<script>
    $(document).ready(function() {
        $('#product_image').change(function(e) {
            var reader = new FileReader();
            reader.onload = function(e) {
                $('#showImage').attr('src', e.target.result);
            }
            reader.readAsDataURL(e.target.files['0']);
        });
    });
</script>

<!-- Text Editor JS -->
<script src='https://cdn.tiny.cloud/1/vdqx2klew412up5bcbpwivg1th6nrh3murc6maz8bukgos4v/tinymce/5/tinymce.min.js' referrerpolicy="origin">
</script>
<script>
  tinymce.init({
        selector: '#specificationTextarea'
    });

    tinymce.init({
        selector: '#descriptionTextarea'
    });
</script>
@endsection
