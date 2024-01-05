@extends('admin.admin_master')

@section('title')Produk Galoo Store | Admin @endsection

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
                        <li class="breadcrumb-item active" aria-current="page">Produk Galoo Store</li>
                    </ol>
                </nav>
            </div>
        </div>
        <!--end breadcrumb-->
        <div class="container">
            <div class="main-body">
                <div class="table-responsive">
                    <table class="table table-striped table-bordered bg-white border" style="width:100%">
                        <thead>
                            <tr>
                                <th>SL</th>
                                <th>Id_Category</th>
                                <th>Id_SubCategory</th>
                                <th>Nama Produk</th>
                                <th>Gambar Produk</th>
                                <th>Harga</th>
                                <th>Stok</th>
                                <th>Action</th>
                                <th>Status</th>

                            </tr>
                        </thead>
                        <tbody>
                            @foreach ($products as $key => $product)
                            <tr>
                                <td>{{ $key+1 }}</td>
                                <td>{{ $product->categories_id }}</td>
                                <td>{{ $product->subcategories_id}}</td>
                                <td>{{ $product->product_name }}</td>
                                <td><img src="{{ $product->product_image }}" alt="image" width="80px"></td>
                                <td>Rp.{{ $product->price }}</td>
                                <td>{{ $product->stock }}</td>
                                <td>
                                    <a href="{{ route('admin.products.edit',$product->id)}}" class="btn btn-info text-white">Edit</a>
                                    <form action="{{ route('admin.products.destroy', $product->id) }}" method="POST" class="d-inline">
                                        @csrf
                                        @method('DELETE')
                                        <button type="submit" class="btn btn bg-danger text-white">Delete</button>
                                    </form>
                                </td>
                                <td>
                                <form action="{{ route('admin.products.toggleStatus', $product->id) }}" method="POST" class="d-inline">
                                    @method('PUT')
                                    @csrf
                                    <button type="submit" class="btn btn bg-{{ $product->status ? 'danger' : 'success' }} text-white">
                                        {{ $product->status ? 'Nonaktifkan' : 'Aktifkan' }}
                                    </button>
                                </form>
                            </td>
                            </tr>
                            @endforeach
                        </tbody>
                    </table>

                    <!-- Start Pagination -->
                    {{ $products->links('vendor.pagination.custom') }}
                    <!-- End Pagination -->

                </div>
            </div>
        </div>
    </div>
</div>
@endsection
