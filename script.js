$(document).ready(function () {
            if($('.collapse-responsive-table').length) {
                $(window).resize(function () {
                    manage_columns();
                });
                manage_columns();

                function manage_columns() {
                    $('.collapse-responsive-table').each(function () {
                        var nb_hidden_columns = 0;
                        let page_width = $(window).width();
                        $(this).find('tr th').each(function () {
                            let column_index = $(this).index() + 1;
                            if($(this).attr('data-breakpoints') && page_width < $(this).attr('data-breakpoints')) {
                                // Hide column and add to collapse
                                let column_title = $(this).text();
                                $(this).parents('.collapse-responsive-table').find('tr *:nth-child('+column_index+')').addClass('hidden-column');
                                // Create collapse opener if needed
                                if(nb_hidden_columns < 1 && !$(this).parents('.collapse-responsive-table').find('.responsive-collapse-toggler').length) {
                                    $(this).parents('.collapse-responsive-table').find('tbody tr td:nth-child(1)').prepend('<span class="responsive-collapse-toggler"></span>');
                                }
                                nb_hidden_columns ++;
                            } else if($(this).hasClass('hidden-column')) {
                                // Show column and remove from collapse
                                $(this).parents('.collapse-responsive-table').find('tr *:nth-child('+column_index+')').removeClass('hidden-column');
                                if(nb_hidden_columns == 0) {
                                    $(this).parents('.collapse-responsive-table').find('.responsive-collapse-toggler').remove();
                                }
                                nb_hidden_columns --;
                            }
                        });
                    });
                }

                $(document).on('click', '.responsive-collapse-toggler', function () {
                    if(!$(this).hasClass('open')) {
                        let collapse_content = '<tr class="collapse-row"><td colspan="100%">';
                        let current_row = $(this).parent('td').parent('tr');
                        $(this).parents('.collapse-responsive-table').find('th.hidden-column').each(function () {
                            let column_index = $(this).index();
                            let column_name = $(this).text();
                            collapse_content += '<p><strong>'+column_name+'</strong> : '+ $(current_row).find('td').eq(column_index).text() +'</p>';
                        });
                        collapse_content += '</td></tr>';
                        $(this).parent('td').parent('tr').after(collapse_content);
                        $(this).addClass('open');
                    } else {
                        $(this).parent('td').parent('tr').next('.collapse-row').remove();
                        $(this).removeClass('open');
                    }
                });
            }
        });
