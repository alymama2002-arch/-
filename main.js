$(document).ready(function() {
    
    // 1. Data Source (Arrays/Objects)
    const servicesData = [
        { id: 1, type: 'food', title: 'طرود غذائية', icon: 'fa-box-open', desc: 'توزيع طرود تموينية متكاملة للأسر النازحة.' },
        { id: 2, type: 'medical', title: 'إسعافات ودواء', icon: 'fa-file-medical', desc: 'تأمين أدوية الأمراض المزمنة والمستلزمات الطبية.' },
        { id: 3, type: 'logistics', title: 'خزانات مياه', icon: 'fa-faucet', desc: 'توصيل مياه صالحة للشرب لمناطق التجمع.' },
        { id: 4, type: 'logistics', title: 'إيواء عاجل', icon: 'fa-tent', desc: 'تجهيز خيام مقاومة للأمطار والبرد.' }
    ];

    const statsData = [
        { area: 'شمال غزة', type: 'غذاء', status: 'منجز', progress: '85%' },
        { area: 'خانيونس', type: 'مياه', status: 'جاري', progress: '60%' },
        { area: 'رفح', type: 'إيواء', status: 'مكتمل', progress: '100%' }
    ];

    // 2. Render Services Using Loops
    function renderServices(filter = 'all') {
        const grid = $('#services-grid');
        grid.fadeOut(300, function() { // jQuery Fade Out effect
            grid.empty();
            servicesData.forEach(item => {
                if (filter === 'all' || item.type === filter) {
                    grid.append(`
                        <div class="col-md-6 col-lg-3">
                            <div class="card service-card h-100 text-center p-4 shadow-sm" data-id="${item.id}">
                                <div class="service-icon"><i class="fas ${item.icon}"></i></div>
                                <h5 class="fw-bold">${item.title}</h5>
                                <p class="text-muted small">${item.desc}</p>
                                <button class="btn btn-sm btn-outline-primary show-details">تفاصيل</button>
                            </div>
                        </div>
                    `);
                }
            });
            grid.fadeIn(300); // jQuery Fade In effect
        });
    }

    // 3. Render Table Data Using Loops & Conditions
    function renderTable() {
        const tbody = $('#stats-table-body');
        statsData.forEach((row, index) => {
            let statusBadge = row.status === 'مكتمل' ? 'bg-success' : (row.status === 'جاري' ? 'bg-warning' : 'bg-secondary');
            tbody.append(`
                <tr>
                    <td>${index + 1}</td>
                    <td>${row.area}</td>
                    <td>${row.type}</td>
                    <td><span class="badge ${statusBadge}">${row.status}</span></td>
                    <td>
                        <div class="progress" style="height: 10px;">
                            <div class="progress-bar" style="width: ${row.progress}"></div>
                        </div>
                    </td>
                </tr>
            `);
        });
    }

    // Initial Render
    renderServices();
    renderTable();

    // 4. jQuery Filtering (Interactivity)
    $('.filter-btn').on('click', function() {
        $('.filter-btn').removeClass('active');
        $(this).addClass('active');
        const filterValue = $(this).data('filter');
        renderServices(filterValue);
    });

    // 5. Modal Display (DOM Manipulation)
    $(document).on('click', '.service-card', function() {
        const serviceId = $(this).data('id');
        const service = servicesData.find(s => s.id === serviceId);
        $('#modal-body-content').html(`
            <div class="text-center">
                <i class="fas ${service.icon} fa-4x mb-3 text-primary"></i>
                <h4>${service.title}</h4>
                <p>${service.desc}</p>
                <hr>
                <p class="small text-danger">هذه الخدمة متاحة حالياً في مناطق العمليات النشطة.</p>
            </div>
        `);
        const myModal = new bootstrap.Modal(document.getElementById('detailsModal'));
        myModal.show();
    });

    // 6. Form Submission & Feedback
    $('#request-form').on('submit', function(e) {
        e.preventDefault();
        const name = $('#userName').val();
        
        // Show loading state
        const btn = $(this).find('button');
        btn.prop('disabled', true).text('جاري الإرسال...');

        setTimeout(() => {
            $('#form-feedback')
                .removeClass('d-none alert-danger')
                .addClass('alert-success')
                .text(`شكراً ${name}، تم استلام طلبك بنجاح وسنتواصل معك قريباً.`);
            
            btn.prop('disabled', false).text('إرسال الطلب');
            $('#request-form')[0].reset();
        }, 1500);
    });
});
