@extends('admin.admin_master')

@section('title')All Pending Order | Admin @endsection

@section('content')
<div class="page-wrapper">
    <div class="page-content">
        <!--breadcrumb-->
        <div class="page-breadcrumb d-none d-sm-flex align-items-center mb-3">
            <div class="breadcrumb-title pe-3">All Pending Order</div>
            <div class="ps-3">
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb mb-0 p-0">
                        <li class="breadcrumb-item"><a href="javascript:;"><i class="bx bx-home-alt"></i></a>
                        </li>
                        <li class="breadcrumb-item active" aria-current="page">All Pending Order</li>
                    </ol>
                </nav>
            </div>
        </div>
        <!--end breadcrumb-->
        <div class="container">
            <div class="main-body">
                <div class="table-responsive">
                    <table id="datatable" class="table table-striped table-bordered bg-white border" style="width:100%">
                        <thead>
                            <tr>
                                <th>SL</th>
                                <th>Nama Produk</th>
                                <th>Kuantitas</th>
                                <th>Jumlah Harga</th>
                                <th>Tanggal Order</th>
                                <th>Status Order</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            @foreach ($orders as $key => $item)
                            <tr>
                                <td>{{ $key+1 }}</td>
                                <td>{{ $item->products_name }}</td>
                                <td>{{ $item->quantity }}</td>
                                <td>Rp{{ $item->total_price }}</td>
                                <td>{{ $item->order_date }}</td>
                                <td><strong class="text-danger">{{ $item->order_status }}</strong></td>
                                <td>
                                    <a href="{{ route('admin.order.details', $item->id) }}" class="btn btn-info text-white">Details</a>
                                </td>
                            </tr>
                            @endforeach
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
